---
layout: post
title: "Gzipped request body in Alamofire"
date: 2015-10-23T21:04:58+02:00
categories: ios
tags: [ios, swift, alamofire]
comments: true
---



Unless you are implementing your own network layer from scratch, [Alamofire](https://github.com/Alamofire/Alamofire)
is __the__ Swift network library of choice on iOS/OSX.


In a recent project I had to make a gzipped request to a service. Unfortunately this is not supported out of the box by Alamofire,
so I started digging in the code of the library to see how I could achieve my goal in the nicest way possible.

{% include _toc.html %}

## ParmeterEncoding


Alamofire has a neat enum called [ParameterEncoding](https://github.com/Alamofire/Alamofire/blob/c2429d953b39ca11ebe3911be2744e0546ee4923/Source/ParameterEncoding.swift).
This emum lets you specify how the parameters passed to ``Alamofire.request(...)`` will be encoded in the body of the generate ``NSURLRequest``.


Not only that but, in some cases (like ``.JSON``) it will also add the appropriate ``Content-Type`` header the HTTP request.
Pretty cool right?

Let's take a look at the ``ParameterEncoding``.

{% highlight swift %}

enum ParameterEncoding {
    case URL
    case URLEncodedInURL
    case JSON
    case PropertyList(format: NSPropertyListFormat, options: NSPropertyListWriteOptions)
    case Custom((URLRequestConvertible, [String: AnyObject]?) -> (NSMutableURLRequest, NSError?))

    func encode(request: NSURLRequest, parameters: [String: AnyObject]?) -> (NSURLRequest, NSError?)
    { ... }
}

{% endhighlight %}


As you can see there is a variety of encodings that are supported out of the box and the ``Custom`` encoding let's you specify your own.
This seemed exactly what I needed.

The ``Custom`` constructor takes a _function_ that takes two arguments ``(URLRequestConvertible, parameters: [String: AnyObject]?)`` and returns a tuple
``(NSURLRequest, NSError?)``. The type of the function is suspiciously similar to the type of the ``encode`` function specified further down
in the enum.

{% highlight swift %}
    func encode(request: NSURLRequest, parameters: [String: AnyObject]?) -> (NSURLRequest, NSError?)
{% endhighlight %}

This is no coincidence. In fact [URLRequestConvertible](https://github.com/Alamofire/Alamofire/blob/0cb96d59ad47be1b6f5018188fcfd1d6b0ecbb0c/Source/Alamofire.swift#L73)
in the constructor of ``Custom`` is a protocol that specifies that the first parameter is something that will produce a ``NSRULRequest``.


Whatever function you pass to the ``Custom`` construct will become the ``encode(..)`` function for your custom encoding. The ``encode(...)`` function
will be called my Alamofire's ``Manager`` class when [constructing the request](https://github.com/Alamofire/Alamofire/blob/0cb96d59ad47be1b6f5018188fcfd1d6b0ecbb0c/Source/Manager.swift#L197).


Great! So since I wanted to GZIP my JSON encoded parameters I could have just done the following using [1024jp/NSData-GZIP](https://github.com/1024jp/NSData-GZIP)
to gzip my request.

{% highlight swift %}

let gzipEncoding = ParameterEncoding.Custom { request, parameters in

    let jsonEncoding = Alamofire.ParameterEncoding.JSON
    let (jsonEncodedRequest, _) = jsonEncoding.encode(request, parameters: parameters)
    let mutableRequest = jsonEncodedRequest.mutableCopy() as! NSMutableURLRequest

    var gzipEncodingError: NSError? = nil

    do {
        let gzippedData = try mutableRequest.HTTPBody?.gzippedData()
        mutableRequest.HTTPBody = gzippedData

        if mutableRequest.HTTPBody != nil {
            mutableRequest.setValue("gzip", forHTTPHeaderField: "Content-Encoding")
        }
    } catch {
        gzipEncodingError = error as NSError
    }

    return (mutableRequest, gzipEncodingError)
}

{% endhighlight %}

This solution works, but what if I wanted to gzip some other encoding? I would have had to make a custom encoding for every
other encoding I wanted to gzip, including other custom ones.


Could there be a more general solution? This is Swift so you can bet there is.


##ParamterEncoding Extension

The result I wanted to achieve was to just be able to create _any_ encoding (``.JSON``, ``PropertyList``, ``Custom``) and gzip it with no extra effort.
Something like this


{% highlight swift %}
Alamofire.request(.POST, someURLString, parameters:["data":["verboseData":"veryVerbose"]], encoding:.JSON.gzipped)
{% endhighlight %}

If you take a look at the type of ``Alamofire.request`` you will notice that the last parameter has type ``ParameterEncoding``. This in turn
would mean that the ``.gzipped`` property I wanted would have to have the same type. Let's start with that.


{% highlight swift %}
extension ParameterEncoding {

    var gzipped:ParameterEncoding {

        return gzip(self)
    }
}
{% endhighlight %}

The computer property ``gzipped`` will call another function to gzip ... itself! Why? Because we want to take advantage of the fact that each encoding
already knows how to encode it's own parameters. We just want to gzip the body of the request.


{% highlight swift %}
extension ParameterEncoding {

    var gzipped:ParameterEncoding {

        return gzip(self)
    }

    private func gzip(encoding:ParameterEncoding) -> ParameterEncoding {
        // think of gzipEncoding as a function that first encodes then gzips
        // this is function composition
        let gzipEncoding = self.gzipOrError • encoding.encode

        return ParameterEncoding.Custom(gzipEncoding)
    }
}
{% endhighlight %}

``gzip(encoding:ParameterEncoding) -> ParameterEncoding`` is a function that given a parameter encoding ( _self_ ) will return another encoding. It will
return our custom one with the gzipped body and an appropriate "Content-Encoding" header.


The only thing left to do now is to write the last function ``gzipOrError`` which has the same type as the return type of ``encode(...)``,
meaning ``(NSURLRequest, NSError?)``, and returns something compatible with the type of ``Custom``, meaning ``(URLRequestConvertible, parameters: [String: AnyObject]?)``


{% highlight swift %}

extension ParameterEncoding {

    var gzipped:ParameterEncoding {

        return gzip(self)
    }

    private func gzip(encoding:ParameterEncoding) -> ParameterEncoding {
        // think of gzipEncoding as a function that first encodes then gzips
        // this is function composition
        let gzipEncoding = self.gzipOrError • encoding.encode

        return ParameterEncoding.Custom(gzipEncoding)
    }

    private func gzipOrError(request:NSURLRequest, error:NSError?) -> (NSMutableURLRequest, NSError?) {

        let mutableRequest = request.mutableCopy() as! NSMutableURLRequest

        if error != nil {
            return (mutableRequest, error)
        }

        var gzipEncodingError: NSError? = nil

        do {
            let gzippedData = try mutableRequest.HTTPBody?.gzippedData()
            mutableRequest.HTTPBody = gzippedData

            if mutableRequest.HTTPBody != nil {
                mutableRequest.setValue("gzip", forHTTPHeaderField: "Content-Encoding")
            }
        } catch {
            gzipEncodingError = error as NSError
        }

        return (mutableRequest, gzipEncodingError)
    }
}
{% endhighlight %}

## Show me the code

Hopefully I have explained how this works without to much confusion. Grab the final version from this [Gist](https://gist.github.com/blender/923f1c1de2f00514ed12).

<script src="https://gist.github.com/blender/923f1c1de2f00514ed12.js"></script>
