#include "wdm.h"

#include "memory.h"
#include "entry.h"
#include "queue.h"

#include "monitor.h"

WDM_PMonitor
wdm_monitor_new()
{
    WDM_PMonitor monitor;

    monitor = WDM_ALLOC(WDM_Monitor);

    monitor->running = FALSE;

    monitor->head = NULL;
    monitor->monitoring_thread = INVALID_HANDLE_VALUE;

    monitor->changes = wdm_queue_new();

    monitor->process_event = CreateEvent(NULL, TRUE, FALSE, NULL);
    monitor->stop_event = CreateEvent(NULL, TRUE, FALSE, NULL);

    if ( ! InitializeCriticalSectionAndSpinCount(&monitor->lock,
            0x00000400) ) // TODO: look into the best value for spinning.
    {
        rb_raise(eWDM_Error, "Can't create a lock for the monitor");
    }

    return monitor;
}

void
wdm_monitor_free(WDM_PMonitor monitor)
{
    if ( monitor->monitoring_thread != INVALID_HANDLE_VALUE ) CloseHandle(monitor->monitoring_thread);

    wdm_entry_list_free(monitor->head);
    wdm_queue_free(monitor->changes);
    DeleteCriticalSection(&monitor->lock);
    CloseHandle(monitor->process_event); // TODO: Look into why this crashes the app when exiting!
    CloseHandle(monitor->stop_event);

    free(monitor);
}

void
wdm_monitor_update_head(WDM_PMonitor monitor, WDM_PEntry new_head)
{
    EnterCriticalSection(&monitor->lock);
        new_head->next = monitor->head;
        monitor->head = new_head;
    LeaveCriticalSection(&monitor->lock);
}

WDM_PMonitorCallbackParam
wdm_monitor_callback_param_new(WDM_PMonitor monitor, WDM_PEntry entry)
{
    WDM_PMonitorCallbackParam param;

    param = WDM_ALLOC(WDM_MonitorCallbackParam);

    param->monitor = monitor;
    param->entry = entry;

    return param;
}

void
wdm_monitor_callback_param_free(WDM_PMonitorCallbackParam param)
{
    free(param);
}