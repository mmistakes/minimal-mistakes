---
title:  "Deconstructing Tuples in C# 7"
categories: 
  - dev
tags:
  - csharp
---

We discussed Tuples in the previous [post](http://blog.ajalex.com/2017/05/26/tuples-in-c-7-0/). They give an easy to use interface, when we need only a subset of members from the class using a single function. But, what if we need to make it more implicit, without having to call a function. C#, now offers the `Deconstruct` function.  

``` csharp
 public class Person
 {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public void Deconstruct(out string firstName, out string lastName)
        {
            firstName = FirstName;
            lastName = LastName;
        }
}

var person = new Person
{
     FirstName = "John",
     LastName = "Doe",
     Age = 20,
     EmailId = "john.doe@example.com"                
};

(var firstName, var lastName) = person;

Assert.Equal("John", firstName);
Assert.Equal("Doe", lastName);

```

Here, since the `Person` class, offers the Deconstruct function with 2 variables, the object of `Person` class (`person`), can be implicitly converted to a tuple value. I believe, people who like using implicit and explicit operator would appreciate this.  
Please find a sample implementation at [GitHub](https://github.com/alenjalex/examples/tree/master/TuplesExample).  
References : [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/tuples#deconstruction)