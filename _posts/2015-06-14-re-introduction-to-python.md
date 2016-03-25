---
layout: post
title: "Re-Introduction to Python"
date: 2015-06-14 07:00:00
categories: python
---

Python is one of the programming languages which can claim to be both **simple** and **powerful**.

> Python is an easy to learn, powerful programming language with efficient high-level data structures and a simple but effective approach to object oriented programming. Python's elegant syntax and dynamic typing, together with its interpreted nature, make it an ideal language for scripting and rapid application development in many areas in many platforms.

**Guido van Rossum**, the creator of the Python language, named the language after the BBC show "Monty Python's Flying Circus".

### Python's Features

* Simple
* Easy to Learn
* Free and Open Source
* High-level Language
* Portable
* Interpreted
* Object Oriented
* Extensible
* Embeddable
* Extensive Libraries

Python does not need compilation to *binary*. You just run the program directly from the source code. Internally, Python converts the source code into an intermediate form called *bytecodes* and then translates this into the native language of your computer and then runs it.

We can use `help()` function to get quick information about any function or statement in Python.

---

### Python's Basics

* Literal constants `5, 3.14, 9.25e-3, 'This is a string' or "It's a string!"`
* Numbers
	* Integers `2, 4, 10`
    * Long integers
    * Floating point numbers or *floats* `3.14, 12.5E-4`
    * Complex numbers `(-5 + 4j), (2.3 - 4.6j)`
* Strings `'single quotes strings', "double quotes strings", '''triple quotes or multiline strings''', """another triple quotes or multiline strings"""`
	* Escape sequences `\', \", \n, \t`
	* Raw strings `r'You can add tab using \t', R"Newlines are indicated by \n"`
	* Unicode strings `u"This is a Unicode string."`
	* Strings are immutable. Once you have created a string, you cannot change it.
	* String literal concatenation. `'What\'s' 'your name?'` is automatically converted in to `"What's your name?"`.
* **Variables** can store information and enable us to manipulate them and we can access them by name.
* **Identifiers**  are names given to identify something i.e. variables.
	* The first character must be a letter of the alphabet or an underscore.
    * The rest can consist of letters, underscores, or digits.
    * Identifier names are case-sensitive.
* Variables can hold values of different types called **data types**.
* Python refers to anything used in a program as an **object**. Python is strongly object-oriented in the sense that everything is an object including numbers, strings and even functions.
* A **physical line** is what you see when you write the program.
* A **logical line** is what Python sees as a single statement.
* **Explicit line joining** is writing a logical line spanning many physical lines follows.
* **Indentation** is used to determine the indentation level of the logical line, which in turn is used to determine the grouping of statements which called **block**.

### Operators and Expressions

* Arithmetics `+ (plus), - (minus), * (multiply), ** (power), / (division), // (floor division), % (modulo)`
* Shifts `<< (left shift), >> (right shift)`
* Bitwise `& (bitwise AND), | (bitwise OR), ^ (bitwise XOR), ~ (bitwise invert)`
* Comparison `< (less than), > (greater than), <= (less than or equal to), >= (greater than or equal to), == (equal to), != (not equal to)`
* Boolean `not (boolean NOT), and (boolean AND), or (boolean OR)`
* Operator precedence from the lowest to highest `lambda; or; and; not x; in, not in; is, is not; <, <=, >, >=, !=, ==; |; ^; &; <<, >>; +, -; *, /, %; +x, -x; ~x; **; x.attribute; x[index]; x[index:index]; f(arguments ...); (expressions, ...); [expressions, ...]; {key:datum, ...}; String conversion`

### Control Flow

`if` statement to check a condition and if the condition is true, we run a block of statements (called the *if-block*).

{% highlight python %}
number = 25
guess = int(raw_input('Guess a number : '))
if guess == number:
	print "You've guessed the number."
# optional
elif guess > number:
   	print "The number is lower than that."
# optional
else:
	print "The number is higher than that."
print "Done."
{% endhighlight %}

`while` statement allows you to repeatedly execute a block of statements as long as a condition is true.

    {% highlight python %}
	number = 25
    running = True
    while running:
    	guess = int(raw_input('Guess a number : '))
        if guess == number:
	    	print "You've guessed the number."
            running = False
	    # optional
		elif guess > number:
	    	print "The number is lower than that."
	    # optional
    	else:
	    	print "The number is higher than that."
	else:
    	print "The game is over."
	print "Done."
    {% endhighlight %}

`for..in` statement is another looping statement which iterates over a sequence of objects.

	for i in range(1, 6):
    # for i in [1, 2, 3, 4, 5]:
		print i
	else:
		print 'The loop is over'

`break` statement is used to break out of a loop statement i.e. stop the execution of a looping statement.

	while True:
		s = raw_input('Write something : ')
		if s == 'quit':
			break
		print 'Length of the string is', len(s)
	print 'Done'
    

> **G2's Poetic Python** 
>
>Programming is fun
When the work is done
if you wanna make your work also fun:
use Python!

`continue` statement is used to tell Python to skip the rest of the statements in the current loop block and to continue to the next iteration of the loop.

	while True:
		s = raw_input('Write something : ')
		if s == 'quit':
			break
		if len(s) < 5:
			continue
		print 'Input is of sufficient length'
		print 'Length of the string is', len(s)

### Functions

Functions are reusable pieces of programs. They allow you to give a name to a block of statements and you can run that block using that name anywhere in your program and any number of times. This is known as calling the function.

**Defining a function**

	def helloWorld():
		print 'Hello World!' # block belonging to the function
	# End of function
	helloWorld() # call the function

A function can take *parameters* which are just values you supply to the function so that the function can do something utilising those values.

	def printMin(a, b):
    	if a < b:
        	print a, 'is minimum'
        else:
        	print b, 'is minimum'
	printMin(4, 6) # directly give literal values
    x = 9
    y = 5
    printMin(x, y) # give variables as arguments

Variable names inside a function definition are not related in any way to other variables with the same names used outside the function i.e. variable names are *local* to the function. This is called the *scope* of the variable.

	def func(n):
	    print 'n is ', n
	    n = 2
	    print 'Local n now is', n
	n = 20
	func(n)
	print 'n is still ', n

`global` statement tells Python that the variable name is not local, but it is *global*.

	def func():
    	global n
	    print 'n is ', n
	    n = 2
	    print 'Global n now is', n
	n = 20
	func()
	print 'n is ', n

*Default argument values* can be used to make some of function's parameters as optional and use default values if the user does not want to provide values for such parameters.

	def write(message, times = 1):
        print message * times
    write('Morning')
    write('Hello', 3)

> You cannot have a parameter with a default argument value before a parameter without a default argument value in the order of parameters declared in the function parameter list.

*Keyword arguments* can be used to specify only some parameters or arguments in the function provided that
the other parameters have default argument values.

	def func(x, y=3, z=7):
        print 'x is', x, 'and y is', y, 'and z is', z
    func(6, 11)
    func(12, z=18)
    func(z=25, x=80)

`return` statement is used to *return* from a function i.e. break out of the function. We can optionally *return* a *value* from the function as well. A `return` statement without a value is equivalent to `return None`. Every function implicitly contains a `return None` statement at the end.

	def minimum(a, b):
        if a < b:
            return a
        else:
            return b
    print minimum(23, 17)

`pass` statement is used in Python to indicate an empty block of statements.

	def someFunc():
		pass

*Documentation strings* or *docstrings* are an important tool that you should make use of since it helps to document the program better and makes it more easy to understand.

	def printMin(a, b):
        '''Prints the maximum of two numbers.
        The two values must be integers.'''
        a = int(a) # convert to integers, if possible
        b = int(b)
        if a < b:
            print a, 'is minimum'
        else:
            print b, 'is minimum'
    printMin(19, 13)
    print printMin.__doc__

### Modules

A module is basically a file containing all your functions and variables that you have defined. To reuse the module in other programs, the filename of the module **must** have a **.py** extension. A module can be *imported* by another program to make use of its functionality. This is how we can use the Python standard library as well.

`import` statement is used to import modules i.e. **sys** module.

	import sys
    print 'The command line arguments are:'
    for x in sys.argv:
        print x
    print '\n\nThe PYTHONPATH is', sys.path, '\n'
    
One way Python make importing a module faster is to create *byte-compiled* files with the extension **.pyc** which is related to the intermediate form that Python transforms the program into.

`__name__` statement can be used to find out the name of a its module.

	if __name__ == '__main__':
        print 'This program is being run by itself'
    else:
        print 'I am being imported from another module'

You can create your own module just by creating a Python source code, just make sure it has **.py** extension.
	
    #!/usr/bin/python
	# Filename: mymodule.py
    def sayhello():
        print 'Hello, this is mymodule speaking.'
    version = '0.1'
    # End of mymodule.py

Then you can import the module.

	import mymodule
        mymodule.sayhello()
    print 'Version', mymodule.version
    
`from..import` statement can be used to import specific functions or variables from a module or all of it using `from..import *` statement.

	from mymodule import sayhello, version
    # Alternative:
    # from mymodule import *
    sayhello()
    print 'Version', version

`dir()` function can be used to list the identifiers that a module defines. The identifiers are the functions, classes and variables defined in that module.

`del` statement is used to delete a variable/name and after the statement has run you can no longer access the variable.

### Data Structures

A **list** is a data structure that holds an ordered collection of items i.e. you can store a sequence of items in a list. **List** is a mutable data type i.e. this type can be altered.

	readlist = [ 'memo', 'magazine', 'newspaper', 'book']
    print 'I have', len(readlist), 'items to read.'
    print 'These items are:',
    for item in readlist:
        print item,
    print '\nI also have to read the notes.'
    readlist.append('notes')
    print 'My reading list is now', readlist
    print 'I will short my list now'
    readlist.sort()
    print 'Sorted reading list is', readlist
    print 'The first item I will read is', readlistp[0]
    olditem = readlist[0]
    del readlist[0]
    print 'I read the', olditem
    print 'My reading list is now', readlist

**Tuples** are just like **lists** except that they are immutable like strings i.e. you cannot modify **tuples**.

	garden = ('roses', 'poppies', 'irises')
    print = 'Number of flowers in the garden is', len(garden)

    new_garden = ('daisies', 'lavender', garden)
    print 'Number of flowers in the new garden is', len(new_garden)
    print 'All flowers in the new garden are', new_garden
    print 'Flowers brought from old garden are', new_garden[2]
    print 'Last flower brought from old garden are', new_garden[2][2]

Empty **tuple** can be specified i.e. `myempty = ()`. Single item **tuple** should be specified i.e. `singleton = (2, )` so that Python can differentiate between a tuple and a pair of parentheses surrounding the object in an expression.

One of the most common usage of tuples is with the `print` statement.

	age = 23
    name = 'Pras'
    print '%s is %d years old' % (name, age)
    print 'Why is %s learning Python?' % name

**Dictionary** is data structure which consists of keys with values pairs. Key must be unique and can only be immutable objects. Pairs of keys and valus are specified by using the notation `d = {key1 : value1, key2 : value2 }`. Key/value pairs in a dictionary are not ordered in any manner. The dictionaries are instances/objects of the **dict** class.

	# 'sl' is short for 's'tudents 'l'ist
    sl = {
        'Agung': 'agung@students.com',
        'Bayu': 'bayu@university.com',
        'Deni': 'deni@study.com',
        'Hafidz': 'hafidz@learn.com'
    }
    print "Agung's email is %s" % sl['Agung']
    # Adding a key/value pair
    sl['Ibnu'] = 'ibnu@courses.com'
    # Deleting a key/value pair
    del sl['Deni']
    print '\nThere are %d students in the student list\n', % len(sl)
    for name, email in sl.items():
        print 'Student %s at %s' % (name, email)
    if 'Ibnu' in sl: # OR sl.has_key('Ibnu')
        print "\nIbnu's email is %s" % sl['Ibnu']

Lists, tuples and strings are examples of **sequences** which has *indexing operation* which allows us to fetch a particular item in the sequence directly and the *slicing operation* which allows us to retrieve a slice of the sequence i.e. a part of the sequence.

	readlist = ['book', 'magazine', 'memo', 'newspaper']
    # Indexing or 'Subscription' operation
    print 'Item 0 is', readlist[0]
    print 'Item 1 is', readlist[1]
    print 'Item 2 is', readlist[2]
    print 'Item 3 is', readlist[3]
    print 'Item -1 is', readlist[-1]
    print 'Item -2 is', readlist[-2]
    # Slicing on a list
    print 'Item 1 to 3 is', readlist[1:3]
    print 'Item 2 to end is', readlist[2:]
    print 'Item 1 to -1 is', readlist[1:-1]
    print 'Item start to end is', readlist[:]
    # Slicing on a string
    name = 'purwoko'
    print 'characters 1 to 3 is', name[1:3]
    print 'characters 2 to end is', name[2:]
    print 'characters 1 to -1 is', name[1:-1]
    print 'characters start to end is', name[:]

Variable only refers to the object and does not represent the object itself. The variable name points to that part of computer's memory where the object is stored. This is called as **binding** of the name to the object.

	print 'Simple Assignment'
    readlist = ['book', 'magazine', 'memo', 'newspaper']
    mylist = readlist # mylist is just another name pointing to the same object!
    del readlist[0] # I read the first item, so I remove it from the list
    print 'readlist is', readlist
    print 'mylist is', mylist
    # notice that both readlist and mylist both print the same list without
    # the 'book' confirming that they point to the same object
    print 'Copy by making a full slice'
    mylist = readlist[:] # make a copy by doing a full slice
    del mylist[0] # remove first item
    print 'readlist is', readlist
    print 'mylist is', mylist
    # notice that now the two lists are different

The strings are all objects of the class **str**. For a complete list of such **str** methods, see `help(str)`.

	name = 'Wijayakusuma' # This is a string object
    if name.startswith('Wij'):
        print 'Yes, the string starts with "Wij"'
    if 'a' in name:
        print 'Yes, it contains the string "a"'
    if name.find('jaya'):
        print 'Yes, it contans the string "jaya"'
    delimiter = '_*_'
    mylist = ['Bandung', 'Surabaya', 'Jakarta', 'Yogyakarta']
    print delimiter.join(mylist)

---

>Reference: C. H. Swaroop. *A Byte of Python*. 2005.
