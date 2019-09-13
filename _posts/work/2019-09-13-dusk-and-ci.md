---
title: "Using Laravel Dusk in your CI"
tags: laravel-dusk circleci travisci
---

Lately I have been working on a lot on a project of mine that has been lagging behind for quite some time.

One of the first thing I wanted to get right was CI. I use both CircleCI and Travis-CI.
Why am I using both? No real reason, other than the fact that I wanted to learn how to use
both of them.

It took me some time to get them both working as I wanted, but one thing that kept
failing from time to time was Laravel Dusk, with the dreaded message:

```
Facebook\WebDriver\Exception\SessionNotCreatedException: session not created: This version of ChromeDriver only supports Chrome version 75
 
(Driver info: chromedriver=75.0.3770.140 (2d9f97485c7b07dc18a74666574f19176731995c-refs/branch-heads/3770@{#1155}),platform=Linux 4.15.0-1028-gcp x86_64)
```

This happened a few times before, and I know how to fix it, by using the great `dusk:chrome-driver` artisan command.
However, I now wanted to fix it once and for all.

The basic fix is to get the current version of Google Chrome installed and update the ChromeDriver to the same version.
It turns out it's not that difficult.

For CircleCI, I already have a step to upgrade the ChromeDriver

```yaml
- run:
    name: Update Chrome Driver
    command: php artisan dusk:chrome-driver 74
```

so all I need to is change that step to

```yaml
- run:
    name: Update Chrome Driver
    command: |
        CHROME_VERSION="$(google-chrome --version)"
        CHROMEDRIVER_RELEASE="$(echo $CHROME_VERSION | sed 's/^Google Chrome //')"
        CHROMEDRIVER_RELEASE=${CHROMEDRIVER_RELEASE%%.*}
        php artisan dusk:chrome-driver $CHROMEDRIVER_RELEASE
```

For Travis-CI the change is very similar. My current `before_script` step includes
`php artisan dusk:chrome-driver 74` so I just need to add a few more commands before that

```yaml
before_script:
  - phpenv config-rm xdebug.ini
  - touch ./storage/logs/laravel.log
  - touch ./database/database.sqlite
  - php artisan migrate --force
  - php artisan passport:install
  - CHROME_VERSION="$(google-chrome-stable --version)"
  - CHROMEDRIVER_RELEASE="$(echo $CHROME_VERSION | sed 's/^Google Chrome //')"
  - CHROMEDRIVER_RELEASE=${CHROMEDRIVER_RELEASE%%.*}
  - php artisan dusk:chrome-driver $CHROMEDRIVER_RELEASE
  - google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 http://localhost &
  - php artisan serve &
```

Note I use `google-chrome-stable` here instead of `google-chrome` as for CircleCI.

