#include "wdm.h"

#include "entry.h"
#include "queue.h"
#include "monitor.h"

#include "rb_monitor.h"
#include "rb_change.h"

// ----------------------------------------------------------
// Global variables
// ----------------------------------------------------------

VALUE mWDM;

VALUE eWDM_Error;
VALUE eWDM_MonitorRunningError;
VALUE eWDM_InvalidDirectoryError;
VALUE eWDM_UnwatchableDirectoryError;

ID wdm_rb_sym_call;
ID wdm_rb_sym_at_file;
ID wdm_rb_sym_at_type;
ID wdm_rb_sym_added;
ID wdm_rb_sym_modified;
ID wdm_rb_sym_removed;
ID wdm_rb_sym_renamed_old_file;
ID wdm_rb_sym_renamed_new_file;

rb_encoding *wdm_rb_enc_utf8;

// ----------------------------------------------------------

void
Init_wdm_ext()
{
    WDM_DEBUG("Registering WDM with Ruby!");

    wdm_rb_enc_utf8 = rb_utf8_encoding();

    mWDM = rb_define_module("WDM");

    eWDM_Error = rb_define_class_under(mWDM, "Error", rb_eStandardError);

    wdm_rb_monitor_init();
    wdm_rb_change_init();
}