#include "wdm.h"

#include "memory.h"
#include "entry.h"

// ---------------------------------------------------------
// Entry user data functions
// ---------------------------------------------------------

WDM_PEntryUserData
wdm_entry_user_data_new()
{
    WDM_PEntryUserData user_data;

    user_data = WDM_ALLOC(WDM_EntryUserData);

    user_data->dir = NULL;
    user_data->watch_childeren = FALSE;

    return user_data;
}

void
wdm_entry_user_data_free(WDM_PEntryUserData user_data)
{
    if ( user_data->dir != NULL ) free(user_data->dir);
    free(user_data);
}

// ---------------------------------------------------------
// Entry functions
// ---------------------------------------------------------

WDM_PEntry
wdm_entry_new()
{
    WDM_PEntry entry;

    entry = WDM_ALLOC(WDM_Entry);

    entry->user_data = wdm_entry_user_data_new();
    entry->dir_handle = INVALID_HANDLE_VALUE;
    entry->next = NULL;

    ZeroMemory(&entry->buffer, WDM_BUFFER_SIZE);
    ZeroMemory(&entry->event_container, sizeof(OVERLAPPED));

    return entry;
}

void
wdm_entry_free(WDM_PEntry entry)
{
    if ( entry->dir_handle != INVALID_HANDLE_VALUE ) {
        CancelIo(entry->dir_handle); // Stop monitoring changes
        CloseHandle(entry->dir_handle);
    }
    wdm_entry_user_data_free(entry->user_data);
    free(entry);
}

void
wdm_entry_list_free(WDM_PEntry entry)
{
    WDM_PEntry tmp;

    while(entry != NULL) {
        tmp = entry;
        entry = entry->next;
        wdm_entry_free(tmp);
    }
}