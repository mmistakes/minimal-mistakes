#include "wdm.h"

#include "utils.h"
#include "entry.h"
#include "queue.h"
#include "monitor.h"

#include "rb_change.h"
#include "rb_monitor.h"

// ----------------------------------------------------------
// Global variables
// ----------------------------------------------------------

VALUE cWDM_Monitor;

VALUE eWDM_UnknownFlagError;

// ----------------------------------------------------------
// Cached variables
// ----------------------------------------------------------

static ID wdm_rb_sym_call;
static ID wdm_rb_sym_files;
static ID wdm_rb_sym_directories;
static ID wdm_rb_sym_attributes;
static ID wdm_rb_sym_size;
static ID wdm_rb_sym_last_write;
static ID wdm_rb_sym_last_access;
static ID wdm_rb_sym_creation;
static ID wdm_rb_sym_security;
static ID wdm_rb_sym_default;

// ---------------------------------------------------------
// Prototypes of static functions
// ---------------------------------------------------------

static void monitor_mark(LPVOID);
static void monitor_free(LPVOID);
static VALUE rb_monitor_alloc(VALUE);

static DWORD id_to_flag(ID);
static DWORD extract_flags_from_rb_array(VALUE);
static VALUE combined_watch(BOOL, int, VALUE*, VALUE);
static VALUE rb_monitor_watch(int, VALUE*, VALUE);

static VALUE rb_monitor_watch_recursively(int, VALUE*, VALUE);

static void CALLBACK handle_entry_change(DWORD, DWORD, LPOVERLAPPED);
static BOOL register_monitoring_entry(WDM_PEntry);
static DWORD WINAPI start_monitoring(LPVOID);

static VALUE wait_for_changes(LPVOID);
static void process_changes(WDM_PQueue);
static void stop_monitoring(LPVOID);
static VALUE rb_monitor_run_bang(VALUE);

static VALUE rb_monitor_stop(VALUE);

// ----------------------------------------------------------

static void
monitor_mark(LPVOID param)
{
    WDM_PMonitor monitor;
    WDM_PEntry entry;

    monitor = (WDM_PMonitor)param;
    entry = monitor->head;

    while(entry != NULL) {
        rb_gc_mark(entry->user_data->callback);
        entry = entry->next;
    }
}

static void
monitor_free(LPVOID param)
{
    WDM_PMonitor monitor;
    WDM_PEntry entry;

    WDM_DEBUG("Freeing a monitor object!");

    monitor = (WDM_PMonitor)param;
    entry = monitor->head;

    stop_monitoring(monitor); // If the monitor is already stopped, it would do nothing

    while(entry != NULL) {
        if ( entry->event_container.hEvent != NULL ) {
            wdm_monitor_callback_param_free(
                (WDM_PMonitorCallbackParam)entry->event_container.hEvent
            );
        }
        entry = entry->next;
    }

    wdm_monitor_free(monitor);
}

static VALUE
rb_monitor_alloc(VALUE self)
{
    WDM_DEBUG("--------------------------------");
    WDM_DEBUG("Allocating a new monitor object!");
    WDM_DEBUG("--------------------------------");

    return Data_Wrap_Struct(self, monitor_mark, monitor_free, wdm_monitor_new());
}

static DWORD
id_to_flag(ID id)
{
    if ( id == wdm_rb_sym_default ) return WDM_MONITOR_FLAGS_DEFAULT;

    // TODO: Maybe reorder the if's in the frequency of use for better performance?
    if ( id == wdm_rb_sym_files ) return FILE_NOTIFY_CHANGE_FILE_NAME;
    if ( id == wdm_rb_sym_directories ) return FILE_NOTIFY_CHANGE_DIR_NAME;
    if ( id == wdm_rb_sym_attributes ) return FILE_NOTIFY_CHANGE_ATTRIBUTES;
    if ( id == wdm_rb_sym_size ) return FILE_NOTIFY_CHANGE_SIZE;
    if ( id == wdm_rb_sym_last_write ) return FILE_NOTIFY_CHANGE_LAST_WRITE;
    if ( id == wdm_rb_sym_last_access ) return FILE_NOTIFY_CHANGE_LAST_ACCESS;
    if ( id == wdm_rb_sym_creation ) return FILE_NOTIFY_CHANGE_CREATION;
    if ( id == wdm_rb_sym_security ) return FILE_NOTIFY_CHANGE_SECURITY;

    rb_raise(eWDM_UnknownFlagError, "Unknown watch flag: ':%s'", rb_id2name(id));
}

static DWORD
extract_flags_from_rb_array(VALUE flags_array)
{
    VALUE flag_symbol;
    DWORD flags;

    flags = 0;

    while ( RARRAY_LEN(flags_array) != 0 ) {
        flag_symbol = rb_ary_pop(flags_array);
        Check_Type(flag_symbol, T_SYMBOL);
        flags |= id_to_flag( SYM2ID(flag_symbol) );
    }

    return flags;
}

static VALUE
combined_watch(BOOL recursively, int argc, VALUE *argv, VALUE self)
{
    WDM_PMonitor monitor;
    WDM_PEntry entry;
    int directory_letters_count;
    VALUE directory, flags, os_encoded_directory;
    BOOL running;

    // TODO: Maybe raise a more user-friendly error?
    rb_need_block();

    Data_Get_Struct(self, WDM_Monitor, monitor);

    EnterCriticalSection(&monitor->lock);
        running = monitor->running;
    LeaveCriticalSection(&monitor->lock);

    if ( running ) {
        rb_raise(eWDM_MonitorRunningError, "You can't watch new directories while the monitor is running!");
    }

    rb_scan_args(argc, argv, "1*", &directory, &flags);

    Check_Type(directory, T_STRING);

    entry = wdm_entry_new();
    entry->user_data->watch_childeren = recursively;
    entry->user_data->callback =  rb_block_proc();
    entry->user_data->flags = RARRAY_LEN(flags) == 0 ? WDM_MONITOR_FLAGS_DEFAULT : extract_flags_from_rb_array(flags);

    // WTF Ruby source: The original code (file.c) uses the following macro to make sure that the encoding
    // of the string is ASCII-compatible, but UTF-16LE (Windows default encoding) is not!!!
    //
    // FilePathValue(directory);

    os_encoded_directory = rb_str_encode_ospath(directory);

    // RSTRING_LEN can't be used because it would return the count of bytes the string uses in its encoding (like UTF-8).
    // UTF-8 might use more than one byte for the char, which is not needed for WCHAR strings.
    // Also, the result of MultiByteToWideChar _includes_ the NULL char at the end, which is not true for RSTRING.
    //
    // Example: 'C:\Users\Maher\Desktop\تجربة' with __ENCODING__ == UTF-8
    //   MultiByteToWideChar => 29 (28-char + null)
    //   RSTRING_LEN => 33 (23-char + 10-bytes for 5 Arabic letters which take 2 bytes each)
    //
    directory_letters_count = MultiByteToWideChar(CP_UTF8, 0, RSTRING_PTR(os_encoded_directory), -1, NULL, 0);

    entry->user_data->dir = ALLOCA_N(WCHAR, directory_letters_count);

    MultiByteToWideChar(CP_UTF8, 0, RSTRING_PTR(os_encoded_directory), -1, entry->user_data->dir, directory_letters_count);

    WDM_WDEBUG("New path to watch: '%s'", entry->user_data->dir);

    entry->user_data->dir = wdm_utils_full_pathname(entry->user_data->dir);

    if ( entry->user_data->dir == 0 ) {
        wdm_entry_free(entry);
        rb_raise(eWDM_Error, "Can't get the absolute path for the passed directory: '%s'!", RSTRING_PTR(directory));
    }

    if ( ! wdm_utils_unicode_is_directory(entry->user_data->dir) ) {
        wdm_entry_free(entry);
        rb_raise(eWDM_InvalidDirectoryError, "No such directory: '%s'!", RSTRING_PTR(directory));
    }

    entry->dir_handle = CreateFileW(
        entry->user_data->dir,     // pointer to the file name
        FILE_LIST_DIRECTORY,       // access (read/write) mode
        FILE_SHARE_READ            // share mode
            | FILE_SHARE_WRITE
            | FILE_SHARE_DELETE,
        NULL,                       // security descriptor
        OPEN_EXISTING,              // how to create
        FILE_FLAG_BACKUP_SEMANTICS
            | FILE_FLAG_OVERLAPPED, // file attributes
        NULL
    );

    if ( entry->dir_handle ==  INVALID_HANDLE_VALUE ) {
        wdm_entry_free(entry);
        rb_raise(eWDM_Error, "Can't watch directory: '%s'!", RSTRING_PTR(directory));
    }

    // Store a reference to the entry instead of an event as the event
    // won't be used when using callbacks.
    entry->event_container.hEvent = wdm_monitor_callback_param_new(monitor, entry);

    wdm_monitor_update_head(monitor, entry);

    WDM_WDEBUG("Watching directory: '%s'", entry->user_data->dir);

    return Qnil;
}

static VALUE
rb_monitor_watch(int argc, VALUE *argv, VALUE self)
{
    return combined_watch(FALSE, argc, argv, self);
}

static VALUE
rb_monitor_watch_recursively(int argc, VALUE *argv, VALUE self)
{
    return combined_watch(TRUE, argc, argv, self);
}

static void CALLBACK
handle_entry_change(
    DWORD err_code,                 // completion code
    DWORD bytes_transfered,         // number of bytes transferred
    LPOVERLAPPED event_container    // I/O information buffer
) {
    WDM_PMonitorCallbackParam param;
    WDM_PQueueItem data_to_process;

    if ( err_code == ERROR_OPERATION_ABORTED ) {
        // Async operation was canceled. This shouldn't happen.
        // TODO:
        //   1. Maybe add a union in the queue for errors?
        //   2. What's the best action when this happens?
        WDM_DEBUG("Dir handler closed in the process callback!");
        return;
    }

    if ( ! bytes_transfered ) {
        WDM_DEBUG("Buffer overflow?! Changes are bigger than the buffer!");
        return;
    }

    param = (WDM_PMonitorCallbackParam)event_container->hEvent;
    data_to_process = wdm_queue_item_new(WDM_QUEUE_ITEM_TYPE_DATA);
    data_to_process->data = wdm_queue_item_data_new();

    WDM_WDEBUG("Change detected in '%s'", param->entry->user_data->dir);

    data_to_process->data->user_data = param->entry->user_data;

    // Copy change data to the backup buffer
    memcpy(data_to_process->data->buffer, param->entry->buffer, bytes_transfered);

    // Add the backup buffer to the change queue
    wdm_queue_enqueue(param->monitor->changes, data_to_process);

    // Resume watching the dir for changes
    register_monitoring_entry(param->entry);

    // Tell the processing thread to process the changes
    if ( WaitForSingleObject(param->monitor->process_event, 0) != WAIT_OBJECT_0 ) { // Check if already signaled
        SetEvent(param->monitor->process_event);
    }
}

static BOOL
register_monitoring_entry(WDM_PEntry entry)
{
    BOOL success;
    DWORD bytes;
    bytes = 0; // Not used because the process callback gets passed the written bytes

    success = ReadDirectoryChangesW(
        entry->dir_handle,                  // handle to directory
        entry->buffer,                      // read results buffer
        WDM_BUFFER_SIZE,                    // length of buffer
        entry->user_data->watch_childeren,  // monitoring option
        entry->user_data->flags,            // filter conditions
        &bytes,                             // bytes returned
        &entry->event_container,            // overlapped buffer
        &handle_entry_change                // process callback
    );

    if ( ! success ) {
        WDM_DEBUG("ReadDirectoryChangesW failed with error (%d): %s", GetLastError(), rb_w32_strerror(GetLastError()));
        return FALSE;
    }

    return TRUE;
}

static DWORD WINAPI
start_monitoring(LPVOID param)
{
    WDM_PMonitor monitor;
    WDM_PEntry curr_entry;

    monitor = (WDM_PMonitor)param;
    curr_entry = monitor->head;

    WDM_DEBUG("Starting the monitoring thread!");

    while(curr_entry != NULL) {
        if ( ! register_monitoring_entry(curr_entry) ) {
            WDM_PQueueItem error_item;
            int directory_bytes;
            LPSTR multibyte_directory;

            directory_bytes = WideCharToMultiByte(CP_UTF8, 0, curr_entry->user_data->dir, -1, NULL, 0, NULL, NULL);
            multibyte_directory = ALLOCA_N(CHAR, directory_bytes);
            WideCharToMultiByte(CP_UTF8, 0, curr_entry->user_data->dir, -1, multibyte_directory, directory_bytes, NULL, NULL);

            error_item = wdm_queue_item_new(WDM_QUEUE_ITEM_TYPE_ERROR);
            error_item->error = wdm_queue_item_error_new(
                eWDM_UnwatchableDirectoryError, "Can't watch directory: '%s'!", multibyte_directory
            );

            wdm_queue_enqueue(monitor->changes, error_item);
            SetEvent(monitor->process_event);
        }

        curr_entry = curr_entry->next;
    }

    while(monitor->running) {
        // TODO: Is this the best way to do it?
        if ( WaitForSingleObjectEx(monitor->stop_event, INFINITE, TRUE) == WAIT_OBJECT_0) {
            WDM_DEBUG("Exiting the monitoring thread!");
            ExitThread(0);
        }
    }

    return 0;
}

static VALUE
wait_for_changes(LPVOID param)
{
    HANDLE process_event;

    process_event = (HANDLE)param;

    return WaitForSingleObject(process_event, INFINITE) == WAIT_OBJECT_0 ? Qtrue : Qfalse;
}

static void
process_changes(WDM_PQueue changes)
{
    WDM_PQueueItem item;
    LPBYTE current_info_entry_offset;
    PFILE_NOTIFY_INFORMATION info;
    VALUE event;

    WDM_DEBUG("---------------------------");
    WDM_DEBUG("Process changes");
    WDM_DEBUG("--------------------------");

    while( ! wdm_queue_is_empty(changes) ) {
        item = wdm_queue_dequeue(changes);

        if ( item->type == WDM_QUEUE_ITEM_TYPE_ERROR ) {
            rb_raise(item->error->exception_klass, item->error->message);
        }
        else {
            current_info_entry_offset = (LPBYTE)item->data->buffer;

            for(;;) {
                info = (PFILE_NOTIFY_INFORMATION)current_info_entry_offset;
                event = wdm_rb_change_new_from_notification(item->data->user_data->dir, info);

                WDM_DEBUG("---------------------------");
                WDM_DEBUG("Running user callback");
                WDM_DEBUG("--------------------------");

                rb_funcall(item->data->user_data->callback, wdm_rb_sym_call, 1, event);

                WDM_DEBUG("---------------------------");

                if ( ! info->NextEntryOffset ) break;

                current_info_entry_offset += info->NextEntryOffset;
            }
        }

        wdm_queue_item_free(item);
    }
}

static void
stop_monitoring(LPVOID param)
{
    BOOL already_stopped;
    WDM_PMonitor monitor;
    WDM_PEntry entry;

    monitor = (WDM_PMonitor)param;
    already_stopped = FALSE;

    WDM_DEBUG("Stopping the monitor!");

    EnterCriticalSection(&monitor->lock);
        if ( ! monitor->running ) {
            already_stopped = TRUE;
        }
        else {
            monitor->running = FALSE;
        }
    LeaveCriticalSection(&monitor->lock);

    if (already_stopped) {
        WDM_DEBUG("Can't stop monitoring because it's already stopped (or it's never been started)!!");
        return;
    }

    entry = monitor->head;

    while(entry != NULL) {
        CancelIo(entry->dir_handle); // Stop monitoring changes
        entry = entry->next;
    }

    SetEvent(monitor->stop_event);
    SetEvent(monitor->process_event); // The process code checks after the wait for an exit signal
    WaitForSingleObject(monitor->monitoring_thread, 10000);
}

static VALUE
rb_monitor_run_bang(VALUE self)
{
    BOOL already_running,
         waiting_succeeded;
    WDM_PMonitor monitor;

    WDM_DEBUG("Running the monitor!");

    Data_Get_Struct(self, WDM_Monitor, monitor);
    already_running = FALSE;

    EnterCriticalSection(&monitor->lock);
        if ( monitor->running ) {
            already_running = TRUE;
        }
        else {
            monitor->running = TRUE;
        }
    LeaveCriticalSection(&monitor->lock);

    if (already_running) {
        WDM_DEBUG("Not doing anything because the monitor is already running!");
        return Qnil;
    }

    // Reset events
    ResetEvent(monitor->process_event);
    ResetEvent(monitor->stop_event);

    monitor->monitoring_thread = CreateThread(
        NULL,                     // default security attributes
        0,                        // use default stack size
        start_monitoring,         // thread function name
        monitor,                  // argument to thread function
        0,                        // use default creation flags
        NULL                      // Ignore thread identifier
    );

    if ( monitor->monitoring_thread == NULL ) {
        rb_raise(eWDM_Error, "Can't create a thread for the monitor!");
    }

    while ( monitor->running ) {

        // Ruby 2.2 removed the 'rb_thread_blocking_region' function. Hence, we now need
        // to check if the replacement function is defined and use it if it's available.
        #ifdef HAVE_RB_THREAD_CALL_WITHOUT_GVL
        waiting_succeeded = rb_thread_call_without_gvl(wait_for_changes, monitor->process_event, stop_monitoring, monitor);
        #else
        waiting_succeeded = rb_thread_blocking_region(wait_for_changes, monitor->process_event, stop_monitoring, monitor);
        #endif

        if ( waiting_succeeded == Qfalse ) {
            rb_raise(eWDM_Error, "Failed while waiting for a change in the watched directories!");
        }

        if ( ! monitor->running ) {
            wdm_queue_empty(monitor->changes);
            return Qnil;
        }

        process_changes(monitor->changes);

        if ( ! ResetEvent(monitor->process_event) ) {
            rb_raise(eWDM_Error, "Couldn't reset system events to watch for changes!");
        }
    }

    return Qnil;
}

static VALUE
rb_monitor_stop(VALUE self)
{
    WDM_PMonitor monitor;

    Data_Get_Struct(self, WDM_Monitor, monitor);

    stop_monitoring(monitor);

    WDM_DEBUG("Stopped the monitor!");

    return Qnil;
}

void
wdm_rb_monitor_init()
{
    WDM_DEBUG("Registering WDM::Monitor with Ruby!");

    wdm_rb_sym_call = rb_intern("call");
    wdm_rb_sym_files = rb_intern("files");
    wdm_rb_sym_directories = rb_intern("directories");
    wdm_rb_sym_attributes = rb_intern("attributes");
    wdm_rb_sym_size = rb_intern("size");
    wdm_rb_sym_last_write = rb_intern("last_write");
    wdm_rb_sym_last_access = rb_intern("last_access");
    wdm_rb_sym_creation = rb_intern("creation");
    wdm_rb_sym_security = rb_intern("security");
    wdm_rb_sym_default = rb_intern("default");

    eWDM_MonitorRunningError = rb_define_class_under(mWDM, "MonitorRunningError", eWDM_Error);
    eWDM_InvalidDirectoryError = rb_define_class_under(mWDM, "InvalidDirectoryError", eWDM_Error);
    eWDM_UnknownFlagError = rb_define_class_under(mWDM, "UnknownFlagError", eWDM_Error);
    eWDM_UnwatchableDirectoryError = rb_define_class_under(mWDM, "UnwatchableDirectoryError", eWDM_Error);

    cWDM_Monitor = rb_define_class_under(mWDM, "Monitor", rb_cObject);

    rb_define_alloc_func(cWDM_Monitor, rb_monitor_alloc);
    rb_define_method(cWDM_Monitor, "watch", RUBY_METHOD_FUNC(rb_monitor_watch), -1);
    rb_define_method(cWDM_Monitor, "watch_recursively", RUBY_METHOD_FUNC(rb_monitor_watch_recursively), -1);
    rb_define_method(cWDM_Monitor, "run!", RUBY_METHOD_FUNC(rb_monitor_run_bang), 0);
    rb_define_method(cWDM_Monitor, "stop", RUBY_METHOD_FUNC(rb_monitor_stop), 0);
}