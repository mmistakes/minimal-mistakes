#include <stdarg.h>

#include "wdm.h"

#include "memory.h"
#include "queue.h"

// ---------------------------------------------------------
// Prototypes of static functions
// ---------------------------------------------------------

static WDM_PQueueItem do_queue_dequeue(WDM_PQueue queue);

// ---------------------------------------------------------
// Queue item functions
// ---------------------------------------------------------

WDM_PQueueItemError
wdm_queue_item_error_new(VALUE exception, LPCSTR format, ...)
{
    WDM_PQueueItemError error;
    va_list ap;
    int length;

    error = WDM_ALLOC(WDM_QueueItemError);

    va_start(ap, format);
    length = _vscprintf(format, ap);
    error->message = WDM_ALLOC_N(CHAR, length + 1);
    vsprintf(error->message, format, ap);
    va_end(ap);

    error->exception_klass = exception;

    return error;
}

void
wdm_queue_item_error_free(WDM_PQueueItemError error)
{
    if ( error->message != NULL ) free(error->message);
    free(error);
}

WDM_PQueueItemData
wdm_queue_item_data_new()
{
    WDM_PQueueItemData data;

    data = WDM_ALLOC(WDM_QueueItemData);
    data->user_data = NULL;

    ZeroMemory(&data->buffer, WDM_BUFFER_SIZE);

    return data;
}

void
wdm_queue_item_data_free(WDM_PQueueItemData data)
{
    free(data);
}

WDM_PQueueItem
wdm_queue_item_new(WDM_QueueItemType type)
{
    WDM_PQueueItem item;

    item = WDM_ALLOC(WDM_QueueItem);
    item->type = type;

    if ( type == WDM_QUEUE_ITEM_TYPE_ERROR ) {
        item->error = NULL;
    }
    else {
        item->data = NULL;
    }

    item->next        = NULL;

    return item;
}

void
wdm_queue_item_free(WDM_PQueueItem item)
{
    if ( item->type == WDM_QUEUE_ITEM_TYPE_ERROR ) {
        if ( item->error != NULL ) wdm_queue_item_error_free(item->error);
    }
    else {
        if ( item->data != NULL ) wdm_queue_item_data_free(item->data);
    }

    // We can't really do anything to the next pointer because
    // we might break any linking the user has established.
    free(item);
}

// ---------------------------------------------------------
// Queue functions
// ---------------------------------------------------------

WDM_PQueue
wdm_queue_new()
{
    WDM_PQueue queue;

    queue = WDM_ALLOC(WDM_Queue);
    queue->front = NULL;
    queue->rear  = NULL;

    if ( ! InitializeCriticalSectionAndSpinCount(&queue->lock,
            0x00000400) ) // TODO: look into the best value for spinning.
    {
        rb_raise(eWDM_Error, "Can't create a lock for the queue");
    }

    return queue;
}

void
wdm_queue_free(WDM_PQueue queue)
{
    wdm_queue_empty(queue);
    free(queue);
}

void
wdm_queue_enqueue(WDM_PQueue queue, WDM_PQueueItem item)
{
    EnterCriticalSection(&queue->lock);

    if ( wdm_queue_is_empty(queue) )  {
        queue->front = queue->rear = item;
    }
    else {
        queue->rear->next = item;
        queue->rear = item;
    }

    LeaveCriticalSection(&queue->lock);
}

WDM_PQueueItem
do_queue_dequeue(WDM_PQueue queue)
{
    WDM_PQueueItem item;

    if ( wdm_queue_is_empty(queue) ) {
        item = NULL;
    }
    else {
        item = queue->front;
        queue->front = queue->front->next;

        // Reset the rear when the queue is empty
        if ( queue->front == NULL ) queue->rear = NULL;

        // Don't allow the user to mess with the queue
        item->next = NULL;
    }

    return item;
}

WDM_PQueueItem
wdm_queue_dequeue(WDM_PQueue queue)
{
    WDM_PQueueItem item;

    EnterCriticalSection(&queue->lock);

    item = do_queue_dequeue(queue);

    LeaveCriticalSection(&queue->lock);

    return item;
}

void
wdm_queue_empty(WDM_PQueue queue)
{
    EnterCriticalSection(&queue->lock);

    while( ! wdm_queue_is_empty(queue) ) {
        wdm_queue_item_free( do_queue_dequeue(queue) );
    }

    LeaveCriticalSection(&queue->lock);
}

inline BOOL
wdm_queue_is_empty(WDM_PQueue queue)
{
    return queue->front == NULL && queue->rear == NULL;
}