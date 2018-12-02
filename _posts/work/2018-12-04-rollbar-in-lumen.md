---
title: "How to use Rollbar in Lumen"
tags: lumen lumen-5.7 rollbar
header:
  image: /assets/images/lumen-plus-rollbar.jpg
  teaser: /assets/images/lumen-plus-rollbar500x300.jpg
---

While working on a project, I was tasked to integrate Rollbar into it. The problem was
that this was a Lumen project, and I didn't find a package maintained for Lumen 5.7.

So I decided to look at the main Rollbar package for Laravel and see what that
did. My idea was to try and replicate that in Lumen.

The Laravel package I looked at was [jensseger/laravel-rollbar](https://github.com/jenssegers/laravel-rollbar),
which is very good, if you have a Laravel project. This package doesn't really do much, it relies a lot on the basic
rollbar package [rollbar/rollbar](https://github.com/rollbar/rollbar-php).

So, first of all, you need `rollbar/rollbar-php`, so add it to your project with

```
composer require rollbar/rollbar
```

Note that this will also install `monolog/monolog` as a requirement. And because of that
we can configure Rollbar as any other Laravel logging system: by a config file.
This is my `config/logging.php` file:

```php
<?php

return [
    'default' => env('LOG_CHANNEL', 'stack'),

    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['rollbar'],
        ],
        'rollbar' => [
            'driver' => 'monolog',
            'handler' => Rollbar\Monolog\Handler\RollbarHandler::class,
            'access_token' => env('ROLLBAR_ACCESS_TOKEN'),
            'level' => 'debug',
        ],
    ],
];
```

The importan part here is the `rollbar` channel, the rest is up to you, you don't have
to use the `stack` channel, by default or otherwise. The meaning of the configuration
are explained in the `rollbar/rollbar` [documentation](https://docs.rollbar.com/docs/php-configuration-reference).

*DISCLAIMER: I haven't tried all of the possible configuration, so I cannot guarantee they
would work. Howeveer, as these are simply passed onto the Rollbar package I don't see
why they shouldn't work.*

The main thing in the `jensseger/laravel-rollbar` package is its service provider.
It's quite exhaustive in the way it checks whether it's safe to use
Rollbar or how it can bypass configuration settings by checking the environment directly.
But I don't need all that, so my `RollbarServiceProvider` looks like this:

```php
<?php

namespace App\Providers;

use Illuminate\Contracts\Config\Repository;
use Illuminate\Support\ServiceProvider;
use Rollbar\RollbarLogger;
use Rollbar\Rollbar;

class RollbarServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(RollbarLogger::class, function () {
            $config = $this->app->make(Repository::class);

            $defaults = [
                'environment' => app()->environment(),
                'root' => base_path(),
                'handle_exception' => true,
                'handle_error' => true,
                'handle_fatal' => true,
            ];

            $rollbarConfig = array_merge($defaults, $config->get('logging.channels.rollbar', []));

            $handleException = (bool)array_pull($rollbarConfig, 'handle_exception');
            $handleError = (bool)array_pull($rollbarConfig, 'handle_error');
            $handleFatal = (bool)array_pull($rollbarConfig, 'handle_fatal');

            Rollbar::init($rollbarConfig, $handleException, $handleError, $handleFatal);

            return Rollbar::logger();
        });
    }
}
```

It's pretty much the same, but stripped down. Now, we need to configure it. First, add a new
environment variable in your `.env` file called `ROLLBAR_ACCESS_TOKEN`. Not that its
value should be the `post_server_item` type of access code from Rollbar.

Finally, now that we have all the pieces, we need to glue them together in the `bootstrap/app.php` file.
So, add the following two line to it:

```php
$app->register(\App\Providers\RollbarServiceProvider::class);
$app->configure('logging');
```

And there you have it: Rollbar integration in Lumen.
