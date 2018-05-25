#include <Windows.h>
#include <ruby.h>

#ifndef WDM_ENTRY_H
#define WDM_ENTRY_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

typedef struct {
    LPWSTR dir;                             // Name of directory to watch
    VALUE callback;                         // Proc object to call when there are changes
    BOOL watch_childeren;                   // Watch sub-directories
    DWORD flags;                            // Flags for the type of changes to report
} WDM_EntryUserData, *WDM_PEntryUserData;

typedef struct WDM_Entry {
    WDM_PEntryUserData user_data;           // User-supplied data
    HANDLE dir_handle;                      // IO handle of the directory
    BYTE buffer[WDM_BUFFER_SIZE];           // Buffer for the results
    OVERLAPPED event_container;             // Async IO event container
    struct WDM_Entry* next;                 // Well, this is a linked list, so this is self-explanatory :)
} WDM_Entry, *WDM_PEntry;

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

WDM_PEntryUserData wdm_entry_user_data_new();
void wdm_entry_user_data_free(WDM_PEntryUserData);

WDM_PEntry wdm_entry_new();
void wdm_entry_free(WDM_PEntry);
void wdm_entry_list_free(WDM_PEntry);

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_ENTRY_H