---
type: posts
title: "'Prop' up your tests with test.check"
excerpt: "Property based testing (PBT) is a powerful technique that discovers edge cases more thoroughly than traditional 'example' based testing"
categories:
  - Blog
tags:
  - testing
  - clojure
  - development
header:
  overlay_image: /assets/images/pbt-screenshot.png
  overlay_filter: 0.25 # same as adding an opacity of 0.5 to a black background
  caption: "Message in a bottle"
  teaser: /assets/images/pbt-screenshot.png
---

I've been experimenting for a few months on and off with property based testing, otherwise known as generative testing. This blog is an attempt to show property based testing applied to the kind of business problems I deal with most days.

The principle of property based testing is to look for invariant 'properties' of a function under test, generate random test data for the function and verify that the 'property' of the function holds true for every generated test case. This contrasts with traditional testing that takes an 'example' based approach, i.e. explicitly coding each input and asserting on the expected output.

Property based testing (PBT) is a powerful technique that discovers edge cases more thoroughly than traditional 'example' based testing as randomly generated input tends to discover test cases that no human would think of. Also PBT can generate hundreds or even thousands of tests.

PBT is exemplified in [John Hughes](https://en.wikipedia.org/wiki/John_Hughes_(computer_scientist)) work in Haskell's [QuickCheck](https://wiki.haskell.org/Introduction_to_QuickCheck1) and the subsequent Erlang implementation of [QuickCheck](http://www.quviq.com/products/erlang-quickcheck/). QuickCheck has also been implemented in other languages notably, [FsCheck](https://github.com/fscheck/FsCheck) for F#, [ScalaCheck](https://www.scalacheck.org/) for Scala and, unsurprisingly, there's an implementation for Clojure called [test.check](https://github.com/clojure/test.check) by Reid Draper. I am not going to go through a detailed description of the power of PBT in this blog but if you're interested these talks by Reid ([Reid Draper - Powerful Testing with test.check](https://www.youtube.com/watch?v=JMhNINPo__g)) and John Hughes ([John Hughes - Testing the Hard Stuff and Staying Sane](https://www.youtube.com/watch?v=zi0rHwfiX1Q)) are well worth checking out

However, I found PBT was not a substitute for example based tests but more a supplement. Example based tests can provide 'developer readable' documentation in a way that PBT doesn't (or at least doesn't for me). Also thinking of properties to test is hard. It takes quite a lot of thought and sometimes quite complex code in it's own right to generate and verify randomly generated test data. I personally found it hard to come up with generic properties of a function before I'd started implementing.

I approached this by using a combination of example based (usually TDD) tests, the REPL for explorative testing and PBT.

My main issue with most of the example of PBT I've been through (and I must have tried at least 6 tutorials!) is that they are simple and algorithmic. By that I mean the functions were pure and tended to have properties that were easily verifiable and inputs that were easily generated. For example. testing sort on a vector or the behaviour of a queue.

I live in the world of business where most of my problems are about moving and transforming data. I don't think I've implemented a sort or a queue like structure since I left university. My problems are messier and tend to involve inconvenient things like state.

Therefore I thought I would try and put together a simple but slightly more real world example to use PBT on that involved a RESTful API. I hope to show how and when I used PBT in combination with traditional REPL and example based tests.

My imaginary API is really simple. It consists of a 'customers' resource that will allow CRUD operations.

--------

## Generating the Customers API ##

Initially I want my API to take and consume Customer resources as JSON data structures. The first thing I need to do is generate a representative Customer data structure. To keep things simple I'm going to just use the ubiquitous HashMap to represent a Customer. My Customer will consist of a name, an email and age. Later I will introduce related resources such as Address but for now let's keep it simple.

Generating name and age is simple using the built in generators for String and choose (which generates int's between a min and max value, inclusively). These generated values need to be returned wrapped in a Hash Map, for which I use the hash-map generator.

``` clojure
(ns blogpbt.generators
 (:require [clojure.string :as str]
           [clojure.test.check.generators :as gen]))
...
;; Generator for customer resource
(def customer
 (gen/hash-map :name gen/string :age (gen/choose 10 100)))
```

This will generate Hash Maps with a :name  key & random string value and an :age key with a randomly chosen value between 10 and 100. However, email is a little trickier. For this I need two parts, a random string for the localpart and a domain joined by @.

So let's construct an email generator:

``` clojure
;; Generator for email
(def domain (gen/elements ["gmail.com" "hotmail.com" "googlemail.com" "yahoo.com" "microsoft.com" "zoho.com"]))

(def email-gen (gen/fmap
                (fn [[name domain]] (str name "@" domain))
                (gen/tuple (gen/not-empty gen/string-alphanumeric) domain)))
```

The domain defines a generator that randomly returns an element from the vector of domains. The email-gen generator generates a 2-tuple (a vector of 2 elements) consisting of a non-empty alphanumeric string and a domain from the domain generator which gen/fmap then maps a function over to join the two strings together with an "@". So if I test it in the REPL for a default sample of 10 values I see something like this:

``` shell
user> (require '[clojure.test.check.generators :as gen])
nil
user> (use 'blogpbt.generators)
nil
user> (gen/sample email-gen)
("H@gmail.com"
 "6@googlemail.com"
 "lR@gmail.com"
 "x4v2@yahoo.com"
 "X@googlemail.com"
 "x@googlemail.com"
 "Q4XbB4@yahoo.com"
 "DMgk53V@gmail.com"
 "Y6GFtHas@zoho.com"
 "4lQk4coZ@gmail.com")
user>
```

This is fine but I also want a few negative tests to prove edge cases. So lets add some nils and some empty strings to our email generator.

``` clojure
(def email-gen (gen/frequency
                [[90 (gen/fmap
                       (fn [[name domain]] (str name "@" domain))
                       (gen/tuple (gen/not-empty gen/string-alphanumeric) domain))]
                 [5 (gen/return "")]
                 [5 (gen/return nil)]]))
```

To create these empty string and nil values I have added a frequency generator that will generate valid email addresses 90% of the time and empty string and nil values 5% of the time for each.

I can then add this email generator to the Customer resource generator:

``` clojure
;; Generator for customer resource
(def customer
 (gen/hash-map :name gen/string :email email-gen :age (gen/choose 10 100)))
```

Let's test our new generator by taking 10 sample values using the REPL:

``` shell
user> (gen/sample email-gen)
("6@microsoft.com"
 "x@yahoo.com"
 "c@zoho.com"
 "Fv@googlemail.com"
 nil
 "Y03i@microsoft.com"
 "d1@microsoft.com"
 "737xH75@microsoft.com"
 ""
 "7T1S7s@yahoo.com")
user>
```

As you can see I now get nil's and empty strings in the generated values.

My first property test will be that posting a customer resource returns an HTTP status `201` (created).

``` clojure
;; Property based tests

(defspec test-post-customer-status-created
 1000
 (prop/for-all [cust customer]
               (let [response (post-resource-json "/customers" {:customer cust})]
                 (= 201 (:status response))))) ;; status should be 'created'
```

defspec defines a specification to test. In this case I am generating a 1000 tests and I verify that a post to the url "/customers" with a body containing the generated customer (as JSON) will return a status of `201`. The for-all macro allows me to define the generator I use to create a customer and bind it to the var cust.

Here I'm using a function post-resource-json to construct my call to the actual API.

## Server API implementation ##

Before I delve into the post-resource-json function lets create our server API using an example based test to verify it, here's my example based test:

``` clojure
(deftest test-app
 (testing "customer post route"
   (let [response (post-resource-json "/customers" {:customer {:name "Fred"}})]
    (is (= (:status response) 201))
    (is (= (into {:id (second
                        (re-find #"customers/([0-9|-[a-f]]+)"
                                 (get-in response [:headers "Location"])))}
                 {:name "Fred"})
           (:body response)))))
```

The into in the second is assert is simply creating a map that contains the original {:name "Fred"} key-value pair with the UUID returned from the Location response header before checking the resulting :id and :name values match those from the body of the response.
This test also uses this mysterious post-resource-json function. I actually developed this function using the REPL.

I started by defining my server using compojure and ring. There are plenty of excellent tutorials and a leiningen template to show how to do this so I'll just dive into the route and function I wrote.

``` clojure
(def datastore (atom {:customers {}}))

(defn- store-customer
  [customer]
  (let [uuid (str (java.util.UUID/randomUUID))
        cust-with-id (assoc customer :id uuid)]
    (swap! datastore assoc-in [:customers uuid] cust-with-id)
    cust-with-id))

(defroutes app-routes
  (POST "/customers" [customer]
        (let [stored-customer (store-customer customer)]
          (-> (resp/created (str "/customers/" (:id stored-customer)) stored-customer)
              (resp/content-type "application/json"))))
  (route/not-found "Not Found"))
```

To keep this example simple I am just using an atom to store my customer resources, keyed by their id. In store-customer I am generating a UUID for the id of the customer and assoc'ing it into the customer map before assoc'ing the resulting map into the atom keyed by it's UUID within the :customers map.

I then created a route mapped to the /customers URI that expects a parameter with the name customer and then calls the store-customer function. The customer map returned from this call is then wrapped in a 'created' HTTP response which has it's location header set to the resource's URI, a status of `201` (created) with a content type of JSON.

Any other route returns not-found (status `404`).

I built this up layer by layer trying out each function in the REPL. The final piece of the puzzle is to define the entry point of the application and wrap the routes in middleware to handle API calls, JSON parameters and JSON response.

``` clojure
(def app
 (-> (wrap-defaults app-routes api-defaults)
     wrap-json-params
     wrap-json-response))
```

Note: The ns declaration to bring in the resp namespace and the ring middleware looks like this:

``` clojure
(ns blogpbt.handler
  (:require [compojure
             [core :refer :all]
             [route :as route]]
            [ring.middleware
             [defaults :refer [api-defaults wrap-defaults]]
             [json :refer [wrap-json-params wrap-json-response]]]
            [ring.util.response :as resp]))
```

I can now test this in the REPL using ring.mock.request to build a request map and cheshire to create JSON from Clojure maps.

``` shell
user> (use 'blogpbt.handler)
nil
user> (require '[ring.mock.request :as mock])
nil
user> (-> (mock/request :post "/customers" (cheshire.core/generate-string {:customer {:name "Bob"}}))
          (mock/content-type "application/json")
          app)
{:status 201,
 :headers {"Location" "/customers/2b3fc2cf-0976-4406-9ef2-927a5be0fb8e", "Content-Type" "application/json"},
 :body "{\"name\":\"Bob\",\"id\":\"2b3fc2cf-0976-4406-9ef2-927a5be0fb8e\"}"}
user>
```

The resulting response has the correct status for a created resource and the header looks good as does the body. Now let's return to that mysterious post-resource-json function. It looks like this:

``` clojure
(defn- parse-json-body
 [response]
 (let [body (:body response)]
   (if (and (not= 404 (:status response))
            body
            (not (empty? body)))
     (assoc response :body (parse-string body true))
     response)))

(defn post-resource-json [url resource]
 (let [request (mock/content-type (mock/request :post url (generate-string resource)) "application/json")
       response (app request)]
   (parse-json-body response)))
```

The post-resource-json function creates a request in the same way I did in the REPL then calls the handler bound to app which returns a response map. The parse-json-body is a convenience function to dig into the response body and parse it from a String of JSON to a Clojure map provided that the request didn't `404` and returned a non-nil un-empty body.

Let's run the test defined earlier to be sure we have both the implementation and the test correct.

``` shell
user> (use 'clojure.test)
nil
user> (use 'blogpbt.handler-test)
nil
user> (test-var 'blogpbt.handler-test/test-app)
nil
```

All looks good.

### More properties to test ###

Now let's try running the test-post-customer-status-created specification that, if you remember, looks like this:

``` clojure
(defspec test-post-customer-status-created
 1000
 (prop/for-all [cust customer]
               (let [response (post-resource-json "/customers" {:customer cust})]
                 (= 201 (:status response)))))
```

Running this produces:

``` shell
user> (use 'clojure.test)
nil
user> (run-tests 'blogpbt.handler-test)

Testing blogpbt.handler-test
{:result true, :num-tests 1000, :seed 1459755215741, :test-var "test-post-customer-status-created"}

Ran 2 tests containing 3 assertions.
0 failures, 0 errors.
{:test 2, :pass 3, :fail 0, :error 0, :type :summary}
user>
```

So I've run a 1000 generated tests over my post customers API successfully. However, at the moment I'm only testing that I've got a created (`201`) status.

I want to add a specification to ensure my Location header has a URI that matches the pattern /customers/{uuid} and that the id returned in the customer resource in the body matches the uuid in the Location header.

``` clojure
(defspec test-post-customer-location-created
 1000
 (prop/for-all [cust customer]
               (let [response (post-resource-json "/customers" {:customer cust})
                     location-id (second (re-find #"customers/([0-9|-[a-f]]+)" (get-in response [:headers "Location"])))]
                 (and
                  (not (nil? location-id))
                  (= (:id (:body response))
                     location-id)))))
```

What about if our customer already exists? As post is not idempotent calling it twice with the same resource in our simplistic API should result in a new resource with a different id.

``` clojure
(defn- extract-location-id
  [response]
  (second (re-find #"customers/([0-9|-[a-f]]+)" (get-in response [:headers "Location"])))

(defspec test-post-customer-already-created
  1000
  (prop/for-all [cust customer]
                (let [response (post-resource-json "/customers" {:customer cust})
                      id (extract-location-id response)]
                  (let [snd-response (post-resource-json "/customers" {:customer cust})]
                    (and (= 201 (:status snd-response))
                         (not= id (extract-location-id snd-response)))) ; post is not idempotent
                  )))
```

In this specification I am posting the same generated customer twice and checking that the id returned from the first call is different from that from the second.

### Adding get customer ###

Now I want to add a 'get' customer method. Let's start by just defining a simple example based test:

``` clojure
(defn get-resource-json [url]
  (-> (mock/request :get url)
      (assoc-in [:headers "Accept"] "application/json")
      app
      (parse-json-body)))

(deftest test-app
 (testing "customer post route"
   ...)

 (testing "customer get route"
   (let [id (->
             (post-resource-json "/customers" {:customer {:name "Fred"}})
             (extract-location-id))
         response (get-resource-json (str "/customers/" id))]
     (is (= (:status response) 200))
     (is (= (:body response) {:id id :name "Fred"})))))
```

And now lets implement the server route and associated function.

``` clojure
(defn- get-customer
 [id]
 (let [customer-found (get-in @datastore [:customers id])]
       (if customer-found
         (resp/content-type (resp/response customer-found) "application/json")
         not-found)))

(defroutes app-routes
  (GET "/customers/:id" [id]
       (get-customer id))
  (POST "/customers" [customer]
        (let [stored-customer (store-customer customer)]
          (-> (resp/created (str "/customers/" (:id stored-customer)) stored-customer)
              (resp/content-type "application/json"))))
  (route/not-found "Not Found"))
```

Again I used the REPL to help build the get-customer function before running the example based test to verify it.

### Get customer properties ###

Let's add some property based tests for get customer.

Firstly I want a specification for testing a customer that already exists returns an HTTP status of OK (`200`) and the expected values in the resource body are returned. To do this I need to generate a customer, post it to the server and then call get on it and check the status is `200` and the body minus the id matches the generated customer map.

``` clojure
(deftest test-get-customer-exists
 (chuck/checking "checking that customer exists" 1000
                 [cust customer]
                 (let [id (extract-location-id (post-resource-json "/customers" {:customer cust}))
                       customer-retrieved (get-resource-json (str "/customers/" id))]
                   (is (= 200 (:status customer-retrieved)))
                   (is (= cust (dissoc (:body customer-retrieved) :id))))))
```

The astute amongst you will notice this test uses clojure.test/deftest like an example based test and has this new checking macro. This macro comes from a really useful utility library called test.chuck that allows us to use normal clojure.test  'is' asserts and the deftest macro to create easier to read test reports. For example, if I define the test above using defspec and change the server to make it fail I get this error output:

``` clojure



(defspec test-get-customer-exists
  1000
  (prop/for-all [cust customer]
                (let [id (extract-location-id (post-resource-json "/customers" {:customer cust}))
                      customer-retrieved (get-resource-json (str "/customers/" id))]
                  (and
                   (= 200 (:status customer-retrieved))
                   (= cust (dissoc (:body customer-retrieved) :id))))))
....
```

``` shell
user> (run-tests 'blogpbt.handler-test)

Testing blogpbt.handler-test

{:result false, :seed 1459759069687, :failing-size 6, :num-tests 7, :fail [{:name "", :email "AZ304G@microsoft.com", :age 13}], :shrunk {:total-nodes-visited 13, :depth 11, :result false, :smallest [{:name "", :email "0@gmail.com", :age 10}]}, :test-var "test-get-customer-exists"}

FAIL in (test-get-customer-exists) (clojure_test.cljc:21)
expected: result
 actual: false
```

Whereas with the version using checking I see more detail about what failed:

``` shell
user> (run-tests 'blogpbt.handler-test)

Testing blogpbt.handler-test

Tests failed, smallest case: [{cust {:name "", :email "0@gmail.com", :age 10}}]
Seed 1459761362035

FAIL in (test-get-customer-exists) (handler_test.clj:76)
checking that customer exists
expected: (= 200 (:status customer-retrieved))
 actual: (not (= 200 404))

ERROR in (test-get-customer-exists) (RT.java:834)
checking that customer exists
expected: (= cust (dissoc (:body customer-retrieved) :id))
 actual: java.lang.ClassCastException: java.lang.String cannot be cast
 to clojure.lang.IPersistentMap
```

So in this report I can still see the smallest case that causes the failure (this is produced by 'shrinking' the failed case to find the smallest case that will still fail). However I can also see that the check for status `200` fails with a `404`. This is turn causes a failure with checking the body of the request as the body for a `404` will be a string "Not found" rather than valid JSON. I find this style of error reporting much easier to follow especially when you have multiple assertions in the property.

As well as testing get for customers that exist I also need to test for customers that don't exist.

``` clojure
(deftest test-get-customer-not-exists
  (chuck/checking "checking that customer doesn't exist"
                  1000
                  [id gen/int]
                  (let [response (get-resource-json (str "/customers/" id))]
                    (is (= 404 (:status response)) (str "Expected status 404 got " (:status response))))))
```

If I run all these tests I get the following output:

``` shell
$ lein test
lein test blogpbt.generators
lein test blogpbt.handler-test
{:result true, :num-tests 1000, :seed 1459763842511, :test-var "test-post-customer-status-created"}
{:result true, :num-tests 1000, :seed 1459763843657, :test-var "test-post-customer-location-created"}
{:result true, :num-tests 1000, :seed 1459763844148, :test-var "test-post-customer-already-created"}
lein test blogpbt.test-utils
Ran 7 tests containing 15 assertions.
0 failures, 0 errors.
$
```

The two tests I defined using a combination of deftest and checking don't report unless they fail but we are running 5000 generated tests plus a handful of example tests that act as sanity checks and documentation.

To examine the source for this blog or run these tests yourself please clone [https://github.com/chrishowejones/blogpbt](https://github.com/chrishowejones/blogpbt).

Although this example shows some of the power of property based testing there is a large category of tests not covered.

I would like to explore what happens if we randomly generate posts and gets (and eventually puts and deletes) against our API. However, working out what result we might expect from a get, for example, relies on knowing the current state of the server. If the customer exists we expect a `200` and the customer details to be returned, if the customer doesn't exist we expect a `404`.

In my next post I will explore how we might model state across Property Based Tests.
