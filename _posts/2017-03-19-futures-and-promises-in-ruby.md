---
title:  "Future and Promises in Ruby"
date:   2017-03-18 14:32:01 IST
tags: ruby concurrent-ruby promises future
---

1. problem ?
2. promises to rescue !
3. example

Consider an application which needs to process nested background task. By nested
I meant if a background task is complete then another task should start
or some final operation once the task is complete.

With bare threads library, there is no cleaner way to achieve this and that is where
Promises comes to rescue.

Concurrent::Promises.future {}
.then {}

Promises framework also provides a way to handle the exception raised in any of
the nested task.

Concurrent::Promises.future {}
.then {}
.rescue { |error| puts error.message }

Lets assume we are listening delivery complete event of all kinds of delivery of
goods.

module ProcessEvent
    module_function
    def process event
        # something
    end
end

module ProcessDeliveryCompleteEvent < ProcessEvent
end

module EventHandler
    module_function
    def handle event
        # after some processing on event
        ProcessDeliveryCompleteEvent.process event
    end
end

Concurrent::Promises.future do
    Provider.poll do |event|
        Concurrent::Promises.future{ EventHandler.handle event }.
        then { log(post_event_processing) }.
        rescue { |error| log(error) }
    end
end.rescue { |error| log(not_listening_to_event_anymore) }
