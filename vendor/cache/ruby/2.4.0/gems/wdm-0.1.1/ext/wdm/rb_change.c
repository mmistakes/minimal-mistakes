#include <stdlib.h>
#include <wchar.h>

#include "wdm.h"

#include "utils.h"

#include "rb_change.h"

// ---------------------------------------------------------
// Internal constants
// ---------------------------------------------------------

// The _wsplitpat constants account for two NULL chars, so subtract 1 because we only need one!
#define WDM_MAX_FILENAME (_MAX_FNAME + _MAX_EXT - 1)

// ----------------------------------------------------------
// Global variables
// ----------------------------------------------------------

VALUE cWDM_Change;

static ID wdm_rb_sym_at_path;
static ID wdm_rb_sym_at_type;
static ID wdm_rb_sym_added;
static ID wdm_rb_sym_modified;
static ID wdm_rb_sym_removed;
static ID wdm_rb_sym_renamed_old_file;
static ID wdm_rb_sym_renamed_new_file;

// ----------------------------------------------------------
// Prototypes of static functions
// ----------------------------------------------------------

static VALUE extract_absolute_path_from_notification(const LPWSTR, const PFILE_NOTIFY_INFORMATION);
static VALUE extract_change_type_from_notification(const PFILE_NOTIFY_INFORMATION);

// ----------------------------------------------------------

// TODO:
//   1. this function uses a lot of 'alloca' calls, which AFAIK is not recommended! Can this be avoided?
//   2. all wcscat calls can be done faster with memcpy, but is it worth sacrificing the readability?
static VALUE
extract_absolute_path_from_notification(const LPWSTR base_dir, const PFILE_NOTIFY_INFORMATION info)
{
    LPWSTR buffer, absolute_filepath;
    WCHAR file[_MAX_FNAME], ext[_MAX_EXT], filename[WDM_MAX_FILENAME];
    DWORD filename_len, absolute_filepath_len;
    LPSTR multibyte_filepath;
    int multibyte_filepath_buffer_size;
    VALUE path;

    filename_len = info->FileNameLength/sizeof(WCHAR);

    // The file in the 'info' struct is NOT null-terminated, so add 1 extra char to the allocation
    buffer = ALLOCA_N(WCHAR, filename_len + 1);

    memcpy(buffer, info->FileName, info->FileNameLength);

    // Null-terminate the string
    buffer[filename_len] = L'\0';

    WDM_WDEBUG("change in: '%s'", buffer);

    absolute_filepath_len = wcslen(base_dir) + filename_len;
    absolute_filepath = ALLOCA_N(WCHAR, absolute_filepath_len + 1); // 1 for NULL
    absolute_filepath[0] = L'\0';

    wcscat(absolute_filepath, base_dir);
    wcscat(absolute_filepath, buffer);

    WDM_WDEBUG("absolute path is: '%s'", absolute_filepath);

    _wsplitpath(buffer, NULL, NULL, file, ext);

    // TODO: Extracting the file name from 'buffer' is only needed when watching sub-dirs
    filename[0] = L'\0';
    if ( file[0] != L'\0' ) wcscat(filename, file);
    if ( ext[0]  != L'\0' ) wcscat(filename, ext);

    WDM_WDEBUG("filename: '%s'", filename);

    filename_len = wcslen(filename);

    // The maximum length of an 8.3 filename is twelve, including the dot.
    if (filename_len <= 12 && wcschr(filename, L'~'))
    {
        LPWSTR unicode_absolute_filepath;
        WCHAR absolute_long_filepath[WDM_MAX_WCHAR_LONG_PATH];
        BOOL is_unc_path;

        is_unc_path = wdm_utils_is_unc_path(absolute_filepath);

        unicode_absolute_filepath = ALLOCA_N(WCHAR, absolute_filepath_len + (is_unc_path ? 8 : 4) + 1); // 8 for "\\?\UNC\" or 4 for "\\?\", and 1 for \0

        unicode_absolute_filepath[0] = L'\0';
        wcscat(unicode_absolute_filepath, L"\\\\?\\");

        if ( is_unc_path ) {
            wcscat(unicode_absolute_filepath, L"UNC\\");
            wcscat(unicode_absolute_filepath, absolute_filepath + 2); // +2 to skip the begin of a UNC path
        }
        else {
            wcscat(unicode_absolute_filepath, absolute_filepath);
        }

        // Convert to the long filename form. Unfortunately, this
        // does not work for deletions, so it's an imperfect fix.
        if (GetLongPathNameW(unicode_absolute_filepath, absolute_long_filepath, WDM_MAX_WCHAR_LONG_PATH) != 0) {
            absolute_filepath = absolute_long_filepath + 4; // Skip first 4 pointers of "\\?\"
            absolute_filepath_len = wcslen(absolute_filepath);
            WDM_WDEBUG("Short path converted to long: '%s'", absolute_filepath);
        }
        else {
            WDM_DEBUG("Can't convert short path to long: '%s'", rb_w32_strerror(GetLastError()));
        }
    }

    // The convention in Ruby is to use forward-slashes to separate dirs on all platforms.
    wdm_utils_convert_back_to_forward_slashes(absolute_filepath, absolute_filepath_len + 1);

    // Convert the path from WCHAR to multibyte CHAR to use it in a ruby string
    multibyte_filepath_buffer_size =
        WideCharToMultiByte(CP_UTF8, 0, absolute_filepath, absolute_filepath_len + 1, NULL, 0, NULL, NULL);

    multibyte_filepath = ALLOCA_N(CHAR, multibyte_filepath_buffer_size);

    if ( 0 == WideCharToMultiByte(CP_UTF8, 0, absolute_filepath, absolute_filepath_len + 1,
            multibyte_filepath, multibyte_filepath_buffer_size, NULL, NULL) ) {
        rb_raise(eWDM_Error, "Failed to add the change file path to the event!");
    }

    WDM_DEBUG("will report change in: '%s'",  multibyte_filepath);

    path = rb_enc_str_new(multibyte_filepath,
        multibyte_filepath_buffer_size - 1, // -1 because this func takes the chars count, not bytes count
        wdm_rb_enc_utf8);

    OBJ_TAINT(path);

    return path;
}

static VALUE
extract_change_type_from_notification(const PFILE_NOTIFY_INFORMATION info)
{
    ID type;

    switch(info->Action) {
    case FILE_ACTION_ADDED: type = wdm_rb_sym_added; break;
    case FILE_ACTION_REMOVED: type = wdm_rb_sym_removed; break;
    case FILE_ACTION_MODIFIED: type = wdm_rb_sym_modified; break;
    case FILE_ACTION_RENAMED_OLD_NAME: type = wdm_rb_sym_renamed_old_file; break;
    case FILE_ACTION_RENAMED_NEW_NAME: type = wdm_rb_sym_renamed_new_file; break;
    default:
        rb_raise(eWDM_Error, "Unknown change happened to a file in a watched directory!");
    }

#if WDM_DEBUG_ENABLED // Used to avoid the func call when in release mode
    WDM_DEBUG("change type: '%s'", rb_id2name(type));
#endif

    return ID2SYM(type);
}

VALUE
wdm_rb_change_new_from_notification(const LPWSTR base_dir, const PFILE_NOTIFY_INFORMATION info)
{
    VALUE change;

    change = rb_class_new_instance(0, NULL, cWDM_Change);

    // Set '@type' to the change type
    rb_ivar_set(change, wdm_rb_sym_at_type, extract_change_type_from_notification(info));

    // Set '@path' to the absolute path of the changed file/directory
    rb_ivar_set(change, wdm_rb_sym_at_path, extract_absolute_path_from_notification(base_dir, info));

    return change;
}

void
wdm_rb_change_init()
{
    WDM_DEBUG("Registering WDM::Event with Ruby!");

    wdm_rb_sym_at_path = rb_intern("@path");
    wdm_rb_sym_at_type = rb_intern("@type");
    wdm_rb_sym_added = rb_intern("added");
    wdm_rb_sym_modified = rb_intern("modified");
    wdm_rb_sym_removed = rb_intern("removed");
    wdm_rb_sym_renamed_old_file = rb_intern("renamed_old_file");
    wdm_rb_sym_renamed_new_file = rb_intern("renamed_new_file");

    cWDM_Change = rb_define_class_under(mWDM, "Change", rb_cObject);

    rb_define_attr(cWDM_Change, "path", 1, 0);
    rb_define_attr(cWDM_Change, "type", 1, 0);
}