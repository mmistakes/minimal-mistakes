---
title: "How to use multiple models from the same table in Laravel 5.5"
tags: laravel laravel-5.5 eloquent 
---

Working on a legacy database I came across an issue where different type of models where stored in the same
table, and therefore use the same Eloquent model in my Laravel app. For example, let's say we have a vehicle table
and for each vehicle we have a type, which could be truck, car, moped, etc.

In pure OOP you would model this something like the following:

```php
class Vehicle {
  public function getType() {
    return 'vehicle';
  }
}

class Truck extends Vehicle {
  public function getType() {
    return 'truck';
  }
}

class Car extends Vehicle {
  public function getType() {
    return 'car';
  }
}

class Moped extends Vehicle {
  public function getType() {
    return 'moped';
  }
}
```

Now, as I said, these were stored in the same table `vehicles`. My problem was that I wanted to be able to do
something like

```php
$vehicles = Vehicle::all();
```

and get an Eloquent collection where each item is of the proper class, for example

```php
[
    Truck {
        ...
    },
    Car {
        ...
    },
    Moped {
        ...
    },
    Truck {
        ...
    }
]
```

This is all pseudocode but I hope the issue is clear.

I did some research and I found a nice solution which takes advantage of the fact that Laravel now always return
a collection and so we can overwrite the `newCollection()` method and recast the models. The article suggested to
create a new collection and a factory for the recasting

```php
class VehicleCollection extends Illuminate\Database\Eloquent\Collection
{
    public function __construct($items)
    {
        parent::__construct($items);
        $this->recastAll();
    }

    private function recastAll()
    {
        $newItems = [];
        foreach ($this->items as $model) {
            if ($model instanceof Vehicle) {
                $newItems[] = VehicleFactory::build($model);
            } else {
                $newItems[] = $model;
            }
        }
        $this->items = $newItems;
    }
}

class VehicleFactory
{
    public static function build(Vehicle $model)
    {
        switch ($model->type) {
            case 'truck':
                return (new Truck())->setRawAttributes($model->getAttributes(), true);
            case 'car':
                return (new Car())->setRawAttributes($model->getAttributes(), true);
            case 'moped':
                return (new Moped())->setRawAttributes($model->getAttributes(), true);
            default:
                // We should never reach this, but in case we add a new type in the DB and we haven't (yet)
                // added the corresponded class, this will prevent an error
                return $model;
        }
    }
}

class Vehicle extends Illuminate\Database\Eloquent\Model {
    public function newCollection(array $models = []) {
        return new VehicleCollection($models);
    }
}
```

This worked quite well at the beginning, but then I had to do it for two more models, one of which the user.
Having three factory classes and three collections classes was a bit too much. I needed to find a way to
be more concise. I decided to use a trait

```php
trait RecastModel
{
    /**
     * @param array $models
     *
     * @return Collection
     */
    public function newCollection(array $models = [])
    {
        $that = $this;

        return (new Collection($models))->map(function ($model) use ($that) {
            if ($model instanceof self) {
                return $that->setNewModel($that->recastModel($model), $model);
            } else {
                return $model;
            }
        });
    }

    protected function setNewModel(Model $newModel, Model $oldModel): Model
    {
        $newModel->setRawAttributes($oldModel->getAttributes(), true)
            ->setRelations($oldModel->getRelations());
        $newModel->exists = $oldModel->exists;

        return $newModel;
    }

    /**
     * This method should return a new model, of a more specific class.
     *
     * This is very the logic to differentiate between the models is implemented
     */
    abstract protected function recastModel(self $model): Model;
}
```

This was much simpler. Now any of the three multi models just needed to use the trait and implement the `recastModel()`
method.

The `setNewModel()` method has been declared `protected` in case you model needs to do something
different for the default.

Note also the setting of the `exists` property on the new model. This is important so that the model
is not created again when saved.