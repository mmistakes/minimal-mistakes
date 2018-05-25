#ifndef WDM_MEMORY_H
#define WDM_MEMORY_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

void* wdm_memory_malloc (size_t);

void* wdm_memory_realloc (void*, size_t);

// ---------------------------------------------------------
// Macros
// ---------------------------------------------------------

#define WDM_ALLOC_N(type,n) ((type*)wdm_memory_malloc((n) * sizeof(type)))
#define WDM_ALLOC(type) ((type*)wdm_memory_malloc(sizeof(type)))
#define WDM_REALLOC_N(var,type,n) ((var)=(type*)wdm_memory_realloc((void*)(var), (n) * sizeof(type)))

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_MEMORY_H