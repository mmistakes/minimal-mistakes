---
title: "Testing with multiple databases with Laravel 5.5"
tags: laravel laravel-5.5 laravel-dusk
---

I love working with Laravel, but when I had to write an app which integrates with two legacy databases
and a new one, I was stuck on writing tests because the `DatabaseMigration` and `DatabaseTransactions`
traits only work on the default database. Or so I thought.

It turned out that the `DatabaseTransactions` trait uses the `connectionToTransact` property
to wrap more than one database into a transaction. So, all I had to do was to define that property.


```php
abstract class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    use CreatesApplication, DatabaseTransactions;

    protected $connectionsToTransact = ['mysql', 'legacy', 'blog'];
}
```

Note that `mysql`, `legacy` and `blog` are the connection names I defined in `config\database.php`

```php
'connections' => [
    'mysql' => [
        'driver'      => 'mysql',
        'host'        => env('DB_HOST', '127.0.0.1'),
        // ...
    ],

    'legacy' => [
        'driver'      => 'mysql',
        'host'        => env('LEGACY_DB_HOST', '127.0.0.1'),
        // ...
    ],

    'blog' => [
        'driver'      => 'mysql',
        'host'        => env('BLOG_DB_HOST', '127.0.0.1'),
        // ...
    ],
    // ...
]
```

Make sure **all** your databases support transactions, e.g. MyISAM tables in a MySQL database do not
support transactions.

This was all hunky-dory for PHPUnit tests, but what about Laravel Dusk? The issue here is that the tests
run in a browser and therefore we cannot use the `DatabaseTransactions` trait as it won't work.
Using the `DatabaseMigration` trait was not an option. My legacy database was big, in terms of number
of tables, and recreating it every time would take a very long time. Besides, I did not have a set of
migrations to run (yes, I could have written them but as I said the migrations would have been too long).

I had to think of something else.

My solution was to use the events that Laravel fires automatically when a model is created to record
those models and delete them at the end of the test. This is the general idea.

So, first of all, I created a new event: `app\Events\EloquentModelCreated.php`

```php
class EloquentModelCreated
{
    use SerializesModels;

    public $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }
}
```

Nothing fancy here. This is the even that will be fired when a model is created and all it does
is ti stores the model itself.

Then I created a listener for that event: `app\Listeners\DatabaseTransactionForDusk.php`

```php
class DatabaseTransactionForDusk
{
    static protected $createdModels = [];

    public static function rollback()
    {
        // Delete the models is reverse order. This prevents errors when deleting
        // a record that with a foreign key without deleting the parent record first.
        // I should say this this "should prevent errors" as I have not tested id with FK
        collect(self::$createdModels)->reverse()->each(function ($model) {
            $model->delete();
        });
        self::$createdModels = [];
    }

    public function handle(EloquentModelCreated $event)
    {
        self::$createdModels[] = $event->model;
    }
}
```

The purpose of this listener is to record all the models that have been created and to delete them
at the end. The `rollback` method should probably live somewhere else, it's not really the job
of a listener to do that. But I couldn't find another appropriate place for it and it's just such a small
listener that I didn't want to spread the code too much.

Now, all my Eloquent models will need the `created` event to be handled by the listener, so to
make my life easier I created a trait: `app\Models\ListenToModelCreated.php`

```php
trait ListenToModelCreated
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->dispatchesEvents = array_merge(
            $this->dispatchesEvents,
            ['created' => EloquentModelCreated::class]
        );
    }
}
```

This is used in all my models. It's true that if I forget to use it in one model then those records
will not be rolled back and I will end up eventually with lots of rubbish in my testing database.
But for the legacy models I do have a base class that they all extend which uses the trait, so happy days.

Last but not least, I had to register the listener for the new event, so I have modified the `boot`
method of the `EventServiceProvider` class as follows:

```php
public function boot()
{
    if ($this->app->environment() == 'dusk') {
        $this->listen[EloquentModelCreated::class] = [DatabaseTransactionForDusk::class];
    }

    parent::boot();
}
```

I'm sure you have noticed I check for the environment before registering the listener. This is because
I want to be able to rollback the databases only when running Laravel Dusk. I could run the tests with
`APP_ENV=dusk php artisan dusk`. However, I am bound to forget about setting the `APP_ENV` variable
before running Dusk and thus cluttering my database with rubbish data. Instead, I take advantage of the fact
that Laravel Dusk looks for a special `.env` file to use ([read here](https://laravel.com/docs/5.5/dusk#environment-handling)).
So, I simply create a `.env.dusk.local` file (which I had anyway because of other settings) and set the
`APP_ENV` there like this

```text
APP_ENV=dusk
...
```

The last piece of the jigsaw is to make sure that the rollback is actually performed at the end of the
test. This is done my defining the `$beforeApplicationDestroyedCallbacks` property of the `DuskTestCase` base class

```php
protected $beforeApplicationDestroyedCallbacks = [
        [DatabaseTransactionForDusk::class, 'rollback'],
    ];
```

And that's it. Now even when running Laravel Dusk your databases will be rolled back to their
original state.