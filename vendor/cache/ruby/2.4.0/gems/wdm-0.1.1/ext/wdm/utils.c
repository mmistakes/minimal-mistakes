#include "wdm.h"

#include "memory.h"
#include "utils.h"

// ---------------------------------------------------------
// Paths functions
// ---------------------------------------------------------

LPWSTR
wdm_utils_convert_back_to_forward_slashes(LPWSTR path, DWORD path_len)
{
    UINT i;

    for(i = 0; i < (path_len - 1); ++i) { // path_len-1 because we don't need to check the NULL-char!
        if ( path[i] == L'\\' ) path[i] = L'/';
    }

    return path;
}

LPWSTR
wdm_utils_full_pathname(const LPWSTR path)
{
    WCHAR maxed_path[WDM_MAX_WCHAR_LONG_PATH];
    LPWSTR full_path;
    size_t full_path_len;
    BOOL is_directory;

    if ( GetFullPathNameW(path, WDM_MAX_WCHAR_LONG_PATH, maxed_path, NULL) == 0 ) {
        return 0;
    }

    is_directory = wdm_utils_unicode_is_directory(maxed_path);

    full_path_len = wcslen(maxed_path);
    full_path = WDM_ALLOC_N(WCHAR, full_path_len + (is_directory ? 2 : 1)); // When it's a directory, add extra 1 for the (\) at the end

    wcscpy(full_path, maxed_path);

    if ( is_directory ) wcscat(full_path, L"\\");

    return full_path;
}

BOOL
wdm_utils_unicode_is_directory(const LPWSTR path)
{
    WCHAR unicode_path[WDM_MAX_WCHAR_LONG_PATH];

    wcscpy(unicode_path, L"\\\\?\\");

    if ( wdm_utils_is_unc_path(path) ) {
        wcscat(unicode_path, L"UNC\\");
        wcscat(unicode_path, path + 2); // +2 to skip the begin of a UNC path
    }
    else {
        wcscat(unicode_path, path);
    }

    return wdm_utils_is_directory(unicode_path);
}

BOOL
wdm_utils_is_directory(const LPWSTR path)
{
  DWORD dwAttrib = GetFileAttributesW(path);

  return (dwAttrib != INVALID_FILE_ATTRIBUTES &&
         (dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

BOOL
wdm_utils_is_unc_path(const LPWSTR path)
{
    return path[0] == path[1] && path[0] == L'\\';
}