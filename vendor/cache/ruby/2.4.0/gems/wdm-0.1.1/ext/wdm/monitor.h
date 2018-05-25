#include <Windows.h>

#include "entry.h"
#include "queue.h"

#ifndef WDM_MONITOR_H
#define WDM_MONITOR_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

typedef struct {
    BOOL running;
    WDM_PEntry head;
    WDM_PQueue changes;
    CRITICAL_SECTION lock;
    HANDLE monitoring_thread;
    HANDLE process_event;
    HANDLE stop_event;
} WDM_Monitor, *WDM_PMonitor;

typedef struct {
    WDM_PEntry entry;
    WDM_PMonitor monitor;
} WDM_MonitorCallbackParam, *WDM_PMonitorCallbackParam;

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

WDM_PMonitor wdm_monitor_new();
void wdm_monitor_free(WDM_PMonitor);

void wdm_monitor_update_head(WDM_PMonitor, WDM_PEntry);

WDM_PMonitorCallbackParam wdm_monitor_callback_param_new(WDM_PMonitor, WDM_PEntry);
void wdm_monitor_callback_param_free(WDM_PMonitorCallbackParam);

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_MONITOR_H