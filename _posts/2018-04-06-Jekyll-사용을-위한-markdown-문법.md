---
layout: single
title: "편안한 Jekyll 사용을 위한 마크다운(markdown) 문법"
---

Github Pages 운용을 위해서는 **markdown** 문법에 대한 이해도가 요구되며, [[공통] 마크다운 markdown 작성법](https://gist.github.com/ihoneymon/652be052a0727ad59601)을 참고하여 작성하였습니다.

~~제가 주로 사용하는 Syntax 위주로 작성하였습니다.~~

## 1. Header & Sub-Header

### - Header

##### Syntax

	이것은 헤더입니다.
	===

##### Example

이것은 Header입니다.
===

### - Sub-Header

##### Syntax

	이것은 부제목입니다.
	---

##### Example

이것은 Sub-Header입니다.
---

### - H1 ~ H6 Tags

##### Syntax
	# H1입니다.
	## H2입니다.
	### H3입니다.
	#### H4입니다.
	##### H5입니다.
	###### H6입니다.


##### Example

# H1입니다.

## H2입니다.

### H3입니다.

#### H4입니다.

##### H5입니다.

###### H6입니다.

## 2. Links

링크를 넣고 싶은 경우는 2가지 방법이 있다. (첫번째 방법이 개인적으로 좀 특이했다..)

##### Syntax
	Link: [참조 키워드][링크변수]
	[링크변수]: WebAddress "Descriptions"

##### Example
Link: [구글로 이동][a]

[a]: https://google.com "Go google"

##### Syntax
	[구글로 이동](https://google.com)

##### Example
[구글로 이동](https://google.com)


## 3. BlockQuote

##### Syntax
	> 이것은 BlockQuote 입니다.
	> 이것은 BlockQuote 입니다.
		> 이것은 BlockQuote 입니다.
		> 이것은 BlockQuote 입니다.
		> 이것은 BlockQuote 입니다.
			> 이것은 BlockQuote 입니다.
			> 이것은 BlockQuote 입니다.
			> 이것은 BlockQuote 입니다.
			> 이것은 BlockQuote 입니다.

##### Example
> 이것은 BlockQuote 입니다.
> 
> 이것은 BlockQuote 입니다.
>> 이것은 BlockQuote 입니다.
>> 
>> 이것은 BlockQuote 입니다.
>> 
>> 이것은 BlockQuote 입니다.
>>> 이것은 BlockQuote 입니다.
>>> 
>>> 이것은 BlockQuote 입니다.
>>> 
>>> 이것은 BlockQuote 입니다.
>>> 
>>> 이것은 BlockQuote 입니다.

## 4. Ordered List

##### Syntax
	1. 순서가 있는 목록
	2. 순서가 있는 목록
	3. 순서가 있는 목록

##### Example
1. 순서가 있는 목록
2. 순서가 있는 목록
3. 순서가 있는 목록

## 5. Unordered List

##### Syntax
	* 순서가 없는 목록
	* 순서가 없는 목록
	* 순서가 없는 목록

	* 순서가 없는 목록
		* 순서가 없는 목록
			* 순서가 없는 목록

	+ 순서가 없는 목록
		- 순서가 없는 목록
			* 순서가 없는 목록

##### Example
* 순서가 없는 목록
* 순서가 없는 목록
* 순서가 없는 목록

* 순서가 없는 목록
	* 순서가 없는 목록
		* 순서가 없는 목록

+ 순서가 없는 목록
	- 순서가 없는 목록
		* 순서가 없는 목록


## 6. Code Block

### - General

##### Syntax
	<pre>코드 블락 열기 전 
	<code> 이곳에 코드를 삽입</code> 
	코드 블락 닫은 후</pre>

##### Example
<pre>코드 블락 열기 전 
	<code> 이곳에 코드를 삽입</code> 
코드 블락 닫은 후</pre>


### - Syntax Highlight	

Python

##### Syntax
	```python
	   # This program adds up integers in the command line
	import sys
	try:
	    total = sum(int(arg) for arg in sys.argv[1:])
	    print 'sum =', total
	except ValueError:
	    print 'Please supply integer arguments'
	```

##### Example
```python
# This program adds up integers in the command line
import sys
try:
    total = sum(int(arg) for arg in sys.argv[1:])
    print 'sum =', total
except ValueError:
    print 'Please supply integer arguments'
```

Ruby

##### Syntax
	```ruby
	a = [ 45, 3, 19, 8 ]
	b = [ 'sam', 'max', 56, 98.9, 3, 10, 'jill' ]
	print (a + b).join(' '), "\n"
	print a[2], " ", b[4], " ", b[-2], "\n"
	print a.sort.join(' '), "\n"
	a << 57 << 9 << 'phil'
	print "A: ", a.join(' '), "\n"
	```

##### Example
```ruby
a = [ 45, 3, 19, 8 ]
b = [ 'sam', 'max', 56, 98.9, 3, 10, 'jill' ]
print (a + b).join(' '), "\n"
print a[2], " ", b[4], " ", b[-2], "\n"
print a.sort.join(' '), "\n"
a << 57 << 9 << 'phil'
print "A: ", a.join(' '), "\n"
```

C++

##### Syntax
	```c++
	int str_equals(char *equal1, char *eqaul2)
	{
	   while(*equal1==*eqaul2)
	   {
	      if ( *equal1 == '\0' || *eqaul2 == '\0' ){break;}
	      equal1++;
	      eqaul2++;
	   }
	   if(*eqaul1 == '\0' && *eqaul2 == '\0' ){return 0;}
	   else {return -1};
	}
	```

##### Example
```c++
int str_equals(char *equal1, char *eqaul2)
{
   while(*equal1==*eqaul2)
   {
      if ( *equal1 == '\0' || *eqaul2 == '\0' ){break;}
      equal1++;
      eqaul2++;
   }
   if(*eqaul1 == '\0' && *eqaul2 == '\0' ){return 0;}
   else {return -1};
}
```

C#

##### Syntax
	```c#
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Text;
	
	namespace Inheritance
	{
	
	    class Program
	    {
	        static void Main(string[] args)
	        {
	            Teacher d = new Teacher();
	            d.Teach();
	            Student s = new Student();
	            s.Learn();
	            s.Teach();
	            Console.ReadKey();
	        }
	        
	        class Teacher
	        {
	            public void Teach()
	            {
	                Console.WriteLine("Teach");
	            }
	        }
	
	        class Student : Teacher
	        {
	            public void Learn()
	            {
	                Console.WriteLine("Learn");
	            }
	        }
	    }
	}
	```

##### Example
```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Inheritance
{

    class Program
    {
        static void Main(string[] args)
        {
            Teacher d = new Teacher();
            d.Teach();
            Student s = new Student();
            s.Learn();
            s.Teach();
            Console.ReadKey();
        }
        
        class Teacher
        {
            public void Teach()
            {
                Console.WriteLine("Teach");
            }
        }

        class Student : Teacher
        {
            public void Learn()
            {
                Console.WriteLine("Learn");
            }
        }
    }
}
```

Java

##### Syntax
	```java
	class DoWhileLoopExample {
	    public static void main(String args[]){
	         int i=10;
	         do{
	              System.out.println(i);
	              i--;
	         }while(i>1);
	    }
	}
	```

##### Example
```java
class DoWhileLoopExample {
    public static void main(String args[]){
         int i=10;
         do{
              System.out.println(i);
              i--;
         }while(i>1);
    }
}
```

Go

##### Syntax
	```go
	package main
	
	import "fmt"
	
	func main() {
	   var greeting =  "Hello world!"
	   
	   fmt.Printf("normal string: ")
	   fmt.Printf("%s", greeting)
	   fmt.Printf("\n")
	   fmt.Printf("hex bytes: ")
	   
	   for i := 0; i < len(greeting); i++ {
	       fmt.Printf("%x ", greeting[i])
	   }
	   
	   fmt.Printf("\n")
	   const sampleText = "\xbd\xb2\x3d\xbc\x20\xe2\x8c\x98" 
	   
	   /*q flag escapes unprintable characters, with + flag it escapses non-ascii 
	   characters as well to make output unambigous */
	   fmt.Printf("quoted string: ")
	   fmt.Printf("%+q", sampleText)
	   fmt.Printf("\n")  
	}
	```

##### Example
```go
package main

import "fmt"

func main() {
   var greeting =  "Hello world!"
   
   fmt.Printf("normal string: ")
   fmt.Printf("%s", greeting)
   fmt.Printf("\n")
   fmt.Printf("hex bytes: ")
   
   for i := 0; i < len(greeting); i++ {
       fmt.Printf("%x ", greeting[i])
   }
   
   fmt.Printf("\n")
   const sampleText = "\xbd\xb2\x3d\xbc\x20\xe2\x8c\x98" 
   
   /*q flag escapes unprintable characters, with + flag it escapses non-ascii 
   characters as well to make output unambigous */
   fmt.Printf("quoted string: ")
   fmt.Printf("%+q", sampleText)
   fmt.Printf("\n")  
}
```

Swift

##### Syntax
	```swift
	let password = "HelloWorld"
	let repeatPassword = "HelloWorld"
	if ((password.elementsEqual(repeatPassword)) == true)
	{
	   print("Passwords are equal")
	} else {
	   print("Passwords are not equal")
	}
	```

##### Example
```swift
let password = "HelloWorld"
let repeatPassword = "HelloWorld"
if ((password.elementsEqual(repeatPassword)) == true)
{
   print("Passwords are equal")
} else {
   print("Passwords are not equal")
}
```

Nodejs

##### Syntax
	```js
	var http = require('http');
	
	http.createServer(function (req, res) {
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Hello World!');
	}).listen(8080); 
	```

##### Example
```js
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080); 
```


## 7. Strikethrough (취소선)

##### Syntax
	~~ 이것은 취소선 입니다. ~~

##### Example
~~이것은 취소선 입니다.~~

## 8. Bold, Italic

##### Syntax
	[Italic]          * 강조와 기울임 *
	[Bold]           ** 강조와 기울임 **
	[Bold & Italic] *** 강조와 기울임 ***
	               **** 강조와 기울임 ****


*강조와 기울임*

**강조와 기울임**

***강조와 기울임***

****강조와 기울임****


## 9. Image

##### Syntax
	![Alt text]({{site.baseurl}}/images/logo.png)
	![Alt text]({{site.baseurl}}/images/logo.png "Optional title")

##### Example
![Alt text]({{site.baseurl}}/images/logo.png)
![Alt text]({{site.baseurl}}/images/logo.png "Optional title")


