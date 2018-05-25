#include <Windows.h>

#include "entry.h"

#ifndef WDM_QUEUE_H
#define WDM_QUEUE_H

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

typedef enum {
    WDM_QUEUE_ITEM_TYPE_ERROR,
    WDM_QUEUE_ITEM_TYPE_DATA
} WDM_QueueItemType;

typedef struct {
    WDM_PEntryUserData user_data;
    BYTE buffer[WDM_BUFFER_SIZE];
} WDM_QueueItemData, *WDM_PQueueItemData;

typedef struct {
    VALUE exception_klass;
    LPSTR message;
} WDM_QueueItemError, *WDM_PQueueItemError;

typedef struct WDM_QueueItem {
    WDM_QueueItemType type;
    union {
        WDM_PQueueItemData data;
        WDM_PQueueItemError error;
    };
    struct WDM_QueueItem* next;
} WDM_QueueItem, *WDM_PQueueItem;

typedef struct {
    CRITICAL_SECTION lock;
    WDM_PQueueItem front;
    WDM_PQueueItem rear;
} WDM_Queue, *WDM_PQueue;

// ---------------------------------------------------------
// Prototypes
// ---------------------------------------------------------

WDM_PQueueItemError wdm_queue_item_error_new(VALUE, LPCSTR, ...);
void wdm_queue_item_error_free(WDM_PQueueItemError);

WDM_PQueueItemData wdm_queue_item_data_new();
void wdm_queue_item_data_free(WDM_PQueueItemData);

WDM_PQueueItem wdm_queue_item_new(WDM_QueueItemType);
void wdm_queue_item_free(WDM_PQueueItem);

WDM_PQueue wdm_queue_new();
void wdm_queue_free(WDM_PQueue);

void wdm_queue_enqueue(WDM_PQueue, WDM_PQueueItem);
WDM_PQueueItem wdm_queue_dequeue(WDM_PQueue);
void wdm_queue_empty(WDM_PQueue);
BOOL wdm_queue_is_empty(WDM_PQueue);

// ---------------------------------------------------------

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // WDM_QUEUE_H