---
title: "Using HAL in content APIs"
tags: laravel laravel-5.5 hal api
---

I was recently tasked with building a few APIs to provide content to our frontend and a few
modules on our website, and perhaps a third party application in the future.
I then started researching the best way to pass content information
using an API. I found HAL pretty simple and straightforward, and quite enough for our needs.

First of all, let me start by briefly explaining what HAL is. You can find more information
[here](https://en.wikipedia.org/wiki/Hypertext_Application_Language).

HAL stands for Hypertext Application Language, and it is an way to standardise how to pass information
to clients who consume your API. The data returned is in JSON format and it consists of mainly three parts:

- the data about the resource itself, called _state_
- a ```_links``` section with endpoints to get more information about the resource
- an ```_embedded``` section with other resources (in HAL format) related to resource in question.

For example, a response from an API to get data about a book could look something like the following

```json
{
  "_links": {
    "self": {
      "href": "/api/v1/books/12345"
    },
    "author": {
      "href": "/api/v1/authors/isac_asimov"
    }
  },
  "id": "12345",
  "title": "Foundation",
  "author": "Isac Asimov"
}
```

Since I had at least three resources I needed to provide an API for, and with more to be added
in future, I wanted a simple, nice, clean way to add new APIs for new resources. What I chose
to do was to create a HAL resource class to help me build the response and a contract that a 
model should implement if there is an API for that resource.

So, let's start with the HAL resource. I am going to break it down to make it easier to understand.

As I said, there are three parts, so have them as protected variables

```php
class HalResource
{
    protected $state = [];
    protected $links = [];
    protected $embedded = [];
    
    //...
}
```

Now, I needed to define setter methods for them. The setter methods for the ```$state``` and
```$links``` properties are quite straightforward:

```php
public function setState(CastToHalContract $state): self
{
    $this->state = $state->toJsonHal();

    return $this;
}

public function addLink($ref, $href): self
{
    $ref = trim(strtolower($ref));

    if ($ref != 'self') {
        $this->links[$ref] = trim(strtolower($href));
    }

    return $this;
}
```

Note the use of the ```toJsonHal()``` method. More on it later.

I chose to have them return the object itself so that I can nicely chain these calls when
building the API response.

The setter for the ```$embedded``` property is slightly more complicated. I decided to have two
setter methods: one to add another ```HalResource``` object directly and one to add a collection
of Eloquent models. This way the controller will be so  much easier to read and understand.

```php
public function addEmbeddedResource($ref, HalResource $resource)
{
    $ref = trim(strtolower($ref));

    if (!isset($this->embedded[$ref])) {
        $this->embedded[$ref] = [];
    }
    $this->embedded[$ref][] = $resource;
}

public function addEmbeddedResources($ref, Collection $collection)
{
    $collection->each(function ($item) use ($ref) {
        $this->addEmbeddedResource($ref, (new self())->setState($item));
    });
}
```

They are not quite the same. As per HAL specification, an embedded resource is a fully fledged HAL
resource, with embedded resource as well if necessary.
This can be achieved with the ```addEmbeddedResource()```
method, but not with the ```addEmbeddedResources()``` (note the plural) method. This is because
the latter works on Collections of model and creates HAL resources on the fly with only the state
set. This was enough for what I needed and therefore I did not look into a more sophisticated
way of adding embedded resources.

Finally, I needed a method to transform this object into an array, ready to be returned by the API.

```php
public function toArray(): array
{
    $data = $this->state;
    foreach ($this->links as $ref => $href) {
        $data['_links'][$ref]['href'] = $href;
    }
    if (!empty($this->embedded)) {
        $data['_embedded'] = [];
        foreach ($this->embedded as $ref => $resources) {
            $data['embedded'][$ref] = [];
            foreach ($resources as $resource) {
                /** @var HalResource $resource */
                $data['_embedded'][$ref][] = $resource->toArray();

            }
        }
    }

    return $data;
}
```

I'm sure you noticed I have already used the contract I was talking about as a typehint in one
of the setter method's signature, so let's define it, it is extremely simple

```php
interface CastToHalContract
{
    public function toJsonHal(): array;
}
```

That's it, just one method. Every model that you would like to return as a HAL resource will need
to implement this contract and off you go.

I worked for a magazine at the time, so an issue had articles and contributors associated with it.
I already had the ```Issue``` model class defined, all I needed to do was to implement the ```toJasonHal()``` method.

```php
class Issue extends Model implements CastToHalContract
{
    //...
    
    public function toJsonHal(): array
    {
        return [
            '_links' => ['self' => ['href' => route('api.v1.issue.index', [$this->issueid], false)]],
            'id'     => $this->issueid,
            // Add all the other properties that you wish to return by the API
            // ...
        ];
    }
    
    ///...
```

One thing to notice here is the inclusion of the ```_links``` section. You may think this is wrong
as I have defined a setter method for it and I should be using it. And you're probably right.
The thing is though, I want to be 100% sure that the link to itself is always present, so instead
of relying on me remembering to call the ```addLink()``` method I decided to make my life
easier by always including it in the implementation of the ```toJasonHal()``` method.
Also notice that the implementation of the ```addLink()``` method does not allow the developer
to add a ```self``` link. This is to prevent accidentally adding the wrong link.

I was now ready to put everything together in the controller.

```php
public function info(LegacyIssue $issue)
{
    $issueResource = (new HalResource())->setState($issue);

    // Add the previous and next links if any
    $prev = $this->issueService->getPreviousIssue($issue->getKey());
    if (!empty($prev)) {
        $issueResource->addLink('prev', route('api.v1.issue.index', $prev->getKey(), false));
    }
    $next = $this->issueService->getNextIssue($issue->getKey());
    if (!empty($next)) {
        $issueResource->addLink('next', route('api.v1.issue.index', $next->getKey(), false));
    }

    // Add the articles, if any
    $issueResource->addEmbeddedResources('articles', $this->issueService->getArticles($issue->getKey()));

    // Add the contributors, if any
    $issueResource->addEmbeddedResources('contributors', $this->issueService->getContributors($issue->getKey()));

    return response()->json($issueResource->toArray());
}
```

Let's go through the controller and see what it does.

The first thing is to set the state of the new HAL resource. Notice that this will use the
model implementation of the ```toJasonHal()``` method.

Then I add the endpoint for the previous and next Issue resource, if any, and the embedded
resources.

Finally, the HAL resource is transformed into an array and returned as a JSON structure.
