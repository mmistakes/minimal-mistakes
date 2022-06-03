---
title: "How to use Cypress with Laravel Sail"
tags: cypress laravel laravel-sail github-action ci
---

I have been using Laravel Dusk for my e2e tests for some time, but the problem I have with it is that it is really slow.
A couple of years ago I started playing with Cypress and I found it, honestly, a joy to work with. I really like
its Test Runner and the fact you can "go back" to each step in your test. On the other hand, I really missed the
easiness of writing the tests for Dusk, as they are in PHP and basically follow from PHPUnit. But, that was a small
price to pay for an overall much better experience.

Therefore I recently embark in a project to port all my Dusk tests to Cypress. The first step though was to setup
my Laravel project AND my CI pipeline to run Cypress tests.

### My environment

My development machine is a Mac, and I use Docker and Laravel Sail, because I don't want to install many tools on my
machine. I like the idea of keeping everything in containers and separate from the host, although I had to make a small
exception for this project, as we will see.

- Laravel 9.15
- Laravel Sail 1.13

### Objectives and requirements

The objectives for this project, as I'm sure you can guess, were to be able to run Cypress Test Runner locally and
run all my Cypress tests during my CI pipeline, which in my case is a GitHub Action Workflow.

The requirements were to do all this in container, as much as possible, and with the latest version of Cypress, which
was 10.0.1 at the time. This meant I didn't want to install Cypress as a node modules, so no `npm install cypress`.

### Local development

There are already Docker images available to run Cypress, but to be able to run its Test Runner you need to do some
more work.

To get started I follow the excellent article
[Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)
by Gleb Bahmutov. It was a great starting point but not quite right for me, especially when it comes to run the
Test Runner.

The main difference was that the article suggest running the container directly, while I wanted to add everything in my
already existing `docker-compose.yml` file, since I already have one for Laravel Sail.

This is how I have defined the service in `docker-compose.yml`:

```yaml
  cypress:
    image: 'cypress/included:10.0.1'
    profiles:
      - 'on-demand-only'
    volumes:
      - '.:/e2e'
      - '/tmp/.X11-unix:/tmp/.X11-unix'
    working_dir: '/e2e'
    environment:
      - CYPRESS_baseUrl=http://laravel.test
      - CYPRESS_VIDEO=false
      - DISPLAY=host.docker.internal:0
    networks:
      - sail
    depends_on:
      - laravel.test
    entrypoint: cypress
```

Let me explain some of the specs.

- I used `profiles` to avoid spinning up the container when I run `sail up` as the
  cypress container would only be used on-demand.
- The two volumes are necessary for Cypress itself and for its Test
  Runner.
- The `baseUrl` must be name of the service for your site as defined inside the `docker-compose.yml` file, as
  both container will run on the same network, `sail` in this case.
- The `DISPLAY` environment variable is for the
  host machine, using the Docker special address `host.docker.internal`.
- Finally, the entrypoint is set to just `cypress`
  so that I can use any Cypress command when starting the container.

Now, following that article you still need to install [XQuartz](https://www.xquartz.org/) on my Mac (this is the little
exception I made to my "no local install" policy) and set it to allow connections from network clients.
But the rest of the instructions did not work for me.

Everytime I tried to run `xhost` to allow
connection I had the `/usr/X11/bin/xhost:  unable to open display ""` error message. It turned out I needed to set
the `DISPLAY` before allowing the connection with `xhost` and not before starting the container.
Not only that, but if I tried and set `DISPLAY=$IP:0` I had
the `/usr/X11/bin/xhost:  unable to open display "192.168.0.220:0"
error message.`

And although `DISPLAY=:0 /usr/X11/bin/xhost + $IP` did not return any error, it didn't work either. When I started
the container it exited immediately with the `Missing X server or $DISPLAY` error message.
What instead worked for me was to get rid of `$IP` altogether and use `DISPLAY=:0 /usr/X11/bin/xhost +`. This does
allow connections from any host, but given I am not on a public network and that I normally close XQuartz anyway when
I am done with development, I didn't see it as a big security risk.
By the way, the fact it didn't work may have had something
to do with how I set the `DISPLAY` variable in the `docker-compose.yml` file, but I didn't want to spend too much time
finding out exactly why. I had a working solution and I was happy with it.

So, in the end, to run the Test Runner on my local development machine, what I need to do is

1. Start XQuartz (don't forget it)
2. Allow connections `DISPLAY=:0 /usr/X11/bin/xhost +`
3. Start the container `sail run -it --rm cypress open --project .`

### GitHub Action

I said earlier that one of my objective was to be able to run the Cypress tests during my CI pipeline.
I use GitHub Actions for that and I already had a workflow set up for my PHPUnit and Dusk tests.
My workflow has a job to build a matrix, and another to install packages and build artifacts which are
then cached and reused. My tests jobs depends on these two.

This posed a small problem. Cypress needs to be installed before running, even when using a Docker image. Since this
needs to happen every time the workflow runs it made sense to try and cache it. Cypress is installed as a Node package
and therefore it made sense to cache it with the other Node modules.

So, my steps to cache both my Node modules and Cypress looks like the following

```yaml
      - name: Cache node modules
        id: cache-node-modules
        uses: actions/cache@v3
        with:
          path: |
            ~/.cache/Cypress
            ./node_modules
          {% raw %}key: ${{ runner.os }}-php-${{ matrix.php-versions }}-build-${{ env.node-modules-cache-name }}-${{ hashFiles('**/package-lock.json') }}{% endraw %}
      - if: steps.cache-composer-packages.outputs.cache-hit != 'true'
        run: npm install
      - name: Install Cypress
        run: npm i cypress
      - name: Verify Cypress
        uses: cypress-io/github-action@v4
        with:
          runTests: false
```

The addition for Cypress were

- the `~/.cache/Cypress` directory
- the installation of Cypress with `npm i cypress`
- the verification of it using the `cypress-io/github-action@v4`. Note the `runTests: false` to avoid, well, running the
  tests

Finally, I was ready to add the job to run the tests. I have remove some of the steps that are not relevant here, like
checking out the code and restoring the caches:

```yaml
  cypress-tests:
    steps:
      - name: Run Laravel Server
        run: php artisan serve &

      - name: Run Cypress Tests
        id: cypress-tests
        uses: cypress-io/github-action@v4
        with:
          install: false
          wait-on: 'http://127.0.0.1:8000'
          config: baseUrl=http://127.0.0.1:8000
          config-file: ./cypress.config.js
          record: true
          project: ./

      - name: Upload screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: {% raw %}${{ github.job }}-screenshots{% endraw %}
          path: cypress/screenshots

      - name: Upload videos
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: {% raw %}${{ github.job }}-videos{% endraw %}
          path: cypress/videos
```

Note that:
- we instruct the docker image not to install Cypress with `install: false`, as the installation already
happened and it was cached
- we must explicitly point to our own Cypress configuration file with `config-file: ./cypress.config.js`
- we must override the configuration value of `baseUrl` as we are now using a PHP server to serve our site for testing

### Conclusion

I'm very happy about how things turned out. I am now able to run the test locally using the Cypress Test Runner, which
is one of my favourite things about Cypress. The tests are also automatically run during my CI pipeline in GitHub.

I have created a [Git Gist](https://gist.github.com/troccoli/c919d766157f2f1167490165cdb87d16) with the content of some
of the files.
