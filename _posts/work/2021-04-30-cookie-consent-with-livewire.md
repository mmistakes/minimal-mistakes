---
title: "How to build a Livewire component for cookies consent"
tags: livewire laravel tailwind cookie
header:
  image: /assets/images/cookie-consent.jpg
  teaser: /assets/images/cookie-consent500x300.jpg
---

In this article I will show how to build a Livewire component to ask for consent to store cookies.

While helping a friend rebuild their website, one of the requirement was to allow users to "like" a post. They could
like a post only once, of course, so I have to store that information somewhere. We don't have logged in users, so I
had to use cookies for that. And with cookies comes the task of asking for the user's consent.

My starting point was the [cookie-consent](https://github.com/jorgbservices/cookie-consent) package. It was a good
starting point but there are a few issues with that, at least for my case:

- the text in the modals are pretty useless, so you are forced to publish the views and customise them.
- since you are changing the views, there is no point having config variables to choose whether to show the cookie
and/or privacy modal. Just add them or remove them as you please.
- most importantly, there is no way to store the fact that the user did not give their consent.

The last point was crucial for me, and that was why I decided to write my own component.

The idea is simple: if the user has never been asked, the show a modal to ask for consent. The modal will allow the user
to either give or refuse their consent. There is also a link to show the cookie policy, which in my case will be
another modal.

So, the first thing I needed was a service to tell me the status of the cookie.

```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;

class CookieConsent
{
    public function cookieExists(): bool
    {
        return !is_null($this->getCookie());
    }

    public function consentHasBeenGiven(): bool
    {
        if ($this->getCookie() === $this->getConsentValue()) {
            return true;
        }

        return false;
    }

    public function giveConsent(): void
    {
        Cookie::queue(
            config('cookie-consent.cookie_name'),
            config('cookie-consent.consent_value'),
            config('cookie-consent.consent_cookie_lifetime')
        );
    }

    public function refuseConsent(): void
    {
        Cookie::queue(
            config('cookie-consent.cookie_name'),
            config('cookie-consent.refuse_value'),
            config('cookie-consent.refuse_cookie_lifetime')
        );
    }

    /**
     * @return array|string|null
     */
    private function getCookie()
    {
        return request()->cookie(config('cookie-consent.cookie_name'));
    }

    private function getConsentValue(): string
    {
        return config('cookie-consent.consent_value');
    }
}
```

As you can see, it's pretty straightforward. We use some configuration which will see later, although they are quite
self-explanatory.

The bit that caught me of guard, and made me spend a couple of hours wondering why it did not work, was using the
`cookie()` helper rather than the `Cookie` facade. I just had to read the Laravel documentation to understand my error,
so please don't do the same.

Then I created the Livewire component

```bash
php artisan livewire:make CookieConsent
```

and put the following in its controller

```php
<?php

namespace App\Http\Livewire;

use Livewire\Component;

class CookieConsent extends Component
{
    public bool $askForConsent;

    public bool $openConsentModal;
    public bool $openCookieModal = false;

    public function mount(\App\Services\CookieConsent $service)
    {
        $this->askForConsent = !$service->cookieExists();
        $this->openConsentModal = true;
    }

    public function toggleCookieModal()
    {
        $this->openCookieModal = !$this->openCookieModal;
        $this->openConsentModal = !$this->openConsentModal;
    }

    public function giveConsent(\App\Services\CookieConsent $service)
    {
        $service->giveConsent();

        $this->openConsentModal = false;
        $this->askForConsent = false;
    }

    public function refuseConsent(\App\Services\CookieConsent $service)
    {
        $service->refuseConsent();

        $this->openConsentModal = false;
        $this->askForConsent = false;
    }

    public function render()
    {
        return view('livewire.cookie-consent.cookie-consent');
    }
}
```

Now, for the view, since I will have two modals, I decided to create two more views for those models. So, the main view
for the componet, `resources/views/livewire/cookie-consent/cookie-consent.blade.php`, will just include the other two:

```
<div>
    @if($askForConsent)
        @include('livewire.cookie-consent.consent-modal')
        @include('livewire.cookie-consent.cookie-policy-modal')
    @endif
</div>
```

The main modal, `resources/views/livewire/cookie-consent/consent-modal.blade.php`  is

```
<div x-data="{ open: @entangle('openConsentModal') }" x-show="open"
     class="fixed z-10 w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50 sm:bg-yellow-500"></div>

    <div class="bg-white w-auto mx-3 sm:mx-0 rounded shadow-lg z-50 overflow-y-auto">
        <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-900">
                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            </div>

            <!--Body-->
            <div class="mt-5 text-center text-gray-500 space-y-2 leading-snug">
                <p>Your experience on this site will be improved by allowing cookies.</p>
                <div>
                    Learn mode about our cookies'
                    <button wire:click="toggleCookieModal" class="hover:text-blue-500">
                        <svg class="h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!--Footer-->
            <div class="mt-5 flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
                <button wire:click="refuseConsent"
                        class="w-full sm:w-1/2 inline-flex justify-center border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue'">
                    Refuse cookies
                </button>
                <button wire:click="giveConsent"
                        class="w-full sm:w-1/2 inline-flex justify-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                    Accept cookies
                </button>
            </div>
        </div>
    </div>
</div>
```

and the modal for the cookie policy, `resources/views/livewire/cookie-consent/cookie-policy-modal.blade.php`, is

```
<div x-data="{ open: @entangle('openCookieModal') }" x-show="open"
     class="fixed z-10 w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="absolute w-full h-full bg-gray-900 opacity-50 sm:bg-yellow-500"></div>

    <div class="bg-white w-auto mx-3 sm:mx-0 rounded shadow-lg z-50 overflow-y-auto">
        <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-900">
                <svg class="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            </div>

            <!--Body-->
            <div class="mt-5 text-center text-gray-500 space-y-2 leading-snug">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Cookie Statement
                </h3>
                <p>Cookies are used to store your personal votes for posts.</p>
            </div>

            <!--Footer-->
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                <button wire:click="toggleCookieModal"
                        class="mb-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>
```

I am sure you have noticed I used [tailwindcss](https://tailwindcss.com/), which I highly recommend.

The text in all the models can be changed for whatever you need. All modals are fully responsive.

Now we come to the configuration. Create the `config/cookie-consent.php` file and add the following:

```php
<?php

return [
    'cookie_name' => 'cookie_consent',

    'consent_value' => 'yes',
    'refuse_value' => 'no',

    'consent_cookie_lifetime' => 60 * 24 * 365,
    'refuse_cookie_lifetime' => 60 * 24 * 30,
];
```

I strongly recommend changing the name of the cookie to make it unique to your site. You can also adjust the values and
lifetimes.

Finally, just add the new component to the pages you need it to, most likely all of them so add it to you layout.

And that's it. Now you can use the `CookieConsent` service around your code to check if the user has or has not given
consent to store cookies.

The codes is also available as a [GitHub Gist](https://gist.github.com/troccoli/d7329605f0354d1c43f976ca1e477bfd).
