---
title: Why you should be writing tests for your code
layout: single
author_profile: true
read_time: true
comments: null
share: true
related: true
categories:
- Best practice
---

People make mistakes. Its human nature. So why do so many developers assume that the code they write will just work?

It can be highly embarassing to demonstrate your code to a customer, only to find that what worked at your desk earlier no longer functions. Testing is an essential tool in a software developers toolbox for producing high quality code. If you aren't already writing tests for your code, then let me convince you to do so.

## What is good code?
* It meets the requirements
* It is maintainable
* It is robust
* It is fast
* It is well architected
* It is well documented

Does your code meet all of these? I can guarantee that writing tests for your code will force you to do so. It forces you to consider the way in which your code is used, and hence the way in which it is written. You'll find yourself considering the architecture and interface of your code. Hopefully it results in writing simpler code that is both easier to maintain and most robust.

## Save yourself time in the future
Writing test inevitably requires that you spend extra time writing code up front. This can (and probably should be) up to 50% of your time writing tests. The pay-off in the future is almost guaranteed though. Rather then spending hours debugging issues, writing tests up front highlights issues quickly and helps to direct debugging towards the root cause.

It is all too easy to add a new feature to your software only to find that you have unintentionally broken something else. In a world without tests, this might not even be found until the code is in the hands of the customer. In a world where tests exist, the developer will know within minutes what they have broken, and what they need to fix.

## Documentation for free
There are fewer better ways understand how a piece of code works than reading the tests for it. The tests will show exactly how the code is intended to be used including input formats, use cases, and expected outputs. By writing tests, you are essentially documenting your code for future developers working on the codebase.

## It's not just for you
Whilst testing has its benefits for a lone developer, its importance increases when working in a team. All those elements of good code discussed earlier make multi-developer environments far easier to work in.

If you are currently a single developer, keep in mind that you might not always be the mainainer of a code base. Consider what state you would expect code and tests to be in were you to take over maintenance of another codebase.

## You're doing it already
It is highlight likely that you are already testing your code informally. How many times have you checked that your code does what your expect in the command window? You're 90% of the way to a test. Formalise it into a testing framework and rather than checking in the command window that one piece of functionality works, you can run your entire test suite and know that all functionality works.

# So how do it test my code in matlab?
Lets go through a quick demonstration of how testing works in matlab. In this simple example, lets assume that we have written a function `myAdd` which adds two numbers again.

``` matlab
function c = myAdd(a, b)
    %MYADD Adds two numbers together

    % add numbers
    c = a + b;
		
end % myAdd
```

You might test this in the command window by checking that 1 + 1 does indeed equal 2. e.g.
```
>> myAdd(1, 1)

ans =

     2
```

However, if we make changes to our function, we then need to keep checking in the command window that different input values give us the expected output values. Instead, lets write several tests that will allow us to run the same checks repeatedly. Here we have created a new file called myAddTests:
```matlab
classdef myAddTests < matlab.unittest.TestCase
    
    methods (Test)
        
        function canAddTwoPositives(testCase)
            
            expected = 2;
            actual = myAdd(1, 1);
            testCase.verifyEqual(actual, expected);
            
        end % canAddTwoPositives
        
        function canAddTwoNegatives(testCase)
            
            expected = -5;
            actual = myAdd(-2, -3);
            testCase.verifyEqual(actual, expected);
            
        end % canAddTwoNegatives
        
        function canAddMixedSign(testCase)
        
            expected = -3;
            actual = myAdd(-5, 2);
            testCase.verifyEqual(actual, expected);
            
        end % canAddMixedSign
        
    end % test methods
    
end % myAddTests
```

Then to run the test we can simply call the following and get quick feedback as to the robustness of our code
```
>> runtests myAddTests
Running myAddTests
...
Done myAddTests
__________


ans = 

  1×3 TestResult array with properties:

    Name
    Passed
    Failed
    Incomplete
    Duration
    Details

Totals:
   3 Passed, 0 Failed, 0 Incomplete.
   0.61071 seconds testing time.
```

This has been a very quick induction into testing code in matlab. To learn more, visit the [official matlab documentation](https://au.mathworks.com/help/matlab/matlab_prog/write-simple-test-case-using-classes.html).