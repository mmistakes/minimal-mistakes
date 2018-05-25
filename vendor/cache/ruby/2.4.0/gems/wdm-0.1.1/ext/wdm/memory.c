#include "wdm.h"

#include "memory.h"

void*
wdm_memory_malloc (size_t size)
{
  void *memory = malloc(size);

  if ( memory == NULL ) {
    rb_fatal("failed to allocate memory");
  }

  return memory;
}

void*
wdm_memory_realloc (void *ptr, size_t size)
{
  void *memory = realloc(ptr, size);

  if ( memory == NULL ) {
    rb_fatal("failed to re-allocate memory");
  }

  return memory;
}