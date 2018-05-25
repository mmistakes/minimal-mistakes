#include <Windows.h>

#ifndef WDM_UTILS_H
#define WDM_UTILS_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

LPWSTR wdm_utils_convert_back_to_forward_slashes(LPWSTR, DWORD);
LPWSTR wdm_utils_full_pathname(const LPWSTR path);
BOOL wdm_utils_is_unc_path(const LPWSTR);
BOOL wdm_utils_is_directory(const LPWSTR);
BOOL wdm_utils_unicode_is_directory(const LPWSTR);

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_UTILS_H