#ifndef WDM_RB_CHANGE_H
#define WDM_RB_CHANGE_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ----------------------------------------------------------
// Global variables
// ----------------------------------------------------------

extern VALUE cWDM_Change;

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

VALUE wdm_rb_change_new_from_notification(const LPWSTR, const PFILE_NOTIFY_INFORMATION);

void wdm_rb_change_init();

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_RB_CHANGE_H