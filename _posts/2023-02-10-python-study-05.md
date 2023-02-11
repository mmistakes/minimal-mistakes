---
layout: single
title: python-study-05 python class
tags: python
---

## python class define  
```python
# Rectangle class
# class 정의(define)
class _Rectangle(): # 붕어빵틀
    # attributes -> member variables
    print("here")
    # methods -> member methods
    pass

# class의 instance를 instantiate

def main():
    # 붕어빵 instantiate
    rect1 = _Rectangle()
    rect2 = _Rectangle()
    print("rect1 : ", rect1)
    print("rect2 : ", rect2)

    return None 

if __name__ == "__main__":
    main()
```


```python
#1 class naming
class _Rectangle(): # _ => user defined, (): later
    # class variable
    # 1. class
    color__ = "white"     # background color
    border__ = 1          # border line width
    # 2. instance
    # member methods
    # default constructors - 클래스가 오브젝트를 만들때 constructors를 먼저 부른다
    def __new__(cls, *args, **kwargs): # class variable 초기화, 이름없는 (this) 객체 공간 확보
        this = super(_Rectangle, cls).__new__(cls) # python에 메모리 확보 요청하는것
        return this
    
    def __init__(self, w = None, h = None): # member variable 초기화, 생성, h, w, self 순서로 들어감(맵핑됨), self는 관례적으로 사용 다른문자 ok
        # self - new에서 받은 this를 가리킴
        self.width_ = w # instance variables, 클래스 변수와 구분되도록 꼭 표시
        self.height_ = h
    '''    
    def __init__(self) #이렇게 하지말기 오류발생, w = None 이렇게 기본값 주기
            self.width_ = None
            self.height_ = None'''
    # area
    def _area(self):
        return self.width_*self.height_

    # print width & height
    def _print(self):
        print("color =", self.color__, "and border =", self.border__)
        print("width =",self.width_, "and height =",self.height_)
        return None
    
    def _get_width(self):
        return self.width_
    
    def _get_height(self):
        return self.height_

    def _set_width(self, w):
        self.width_ = w
        return None
    
    def _set_height(self, h):
        self.height_ = h
        return None
    '''
    def _set_bgcolor(self, color):
        _Rectangle.color__ = color # 안좋은 방법
    '''

def main():
    rect0 = _Rectangle()
    rect1 = _Rectangle(4, 3) # 4cm * 3cm rectangle # self가 숨어있다...(에러메세지로 확인가능), class 메소드에도 숨어있음. 
    
    print(rect1.width_, rect1.height_)
    # rect1.height_ = 10
    # rect1.width_ = 200
    rect1._set_width(200)
    rect1._set_height(10)
    '''
    rect1._print()
    rect2 = _Rectangle(6, 1) # 1 * 6.
    rect2._print()
    #rect2.color__ = "yellow"    # <== class variable X 
    #_Rectangle.color__ = "yellow"   # <== class variable O, 그러나 클래스를 새로 만드는게 낫다.
    rect1._print()
    rect2._print()'''

    # area : method1
    area = rect1.height_*rect1.width_
    # area : via OOP
    print("The area of rect1 =", rect1._area())

    return None

if __name__ == "__main__":
    main()
```


## example class  
```python
class _A4Paper():
    width__ = 210
    height__ = 297

    def __new__(cls,*args,**kwargs):
        this = super(_A4Paper,cls).__new__(cls)
        return this

    def __init__(self, m, b):
        self.manufacture_ = m
        self.background_color_ = b

def main():
    paper1 = _A4Paper("miilk","white")
    print(paper1)

if __name__ == "__main__":
    main()
```


```python
class _Circle():
    # class variables pi__, bgcolor__, border__
    border__ = 1
    bgcolor__ = "white"
    pi__ = 3.141592

    #instance variables radius_
    # __new__ & __init__
    # _area & _print
    def __new__(cls,*args,**kwargs):
        this = super(_Circle,cls).__new__(cls)
        return this
    
    def __init__(self, r = None):
        self.radius_ = r


    def _area(self):
        # return self.radius_*self.radius_*self.pi__ ??
        return self.radius_*self.radius_*_Circle.pi__
    
    def _print(self):
        print("radius =", self.radius_)
        return None

def main():
    c1 = _Circle(3)
    c1._print()
    print(c1._area())

if __name__ == "__main__":
    main()
```


```python
# Ellipse class
class _Ellipse():
    PI__ = 3.141592
    bg_color__ = "Yellow"
    def __new__(cls,*args,**kwargs):
        this = super(_Ellipse,cls).__new__(cls)
        return this
    def __init__(self, mj = None, mi = None):
        self.major_ = mj
        self.minor_ = mi
        return None

    def _get_minor(self):
        return self.minor_
    def _get_major(self):
        return self.major_
    def _set_minor(self, mi):
        self.minor_ = mi
        return None
    def _set_major(self, mj):
        self.major_ = mj
        return None
    def _area(self):
        return self.major_*self.minor_*_Ellipse.PI__
    def _print(self):
        print("major =",self.major_,"minor = ",self.minor_)
        return None

def main():
    ell1 = _Ellipse() 
    ell2 = _Ellipse(5, 3)
    print("Major of ell2 =", ell2._get_major())
    print("Area of ell2 =", ell2._area())
    ell2._set_minor(10)
    print("Area of ell2 =", ell2._area())
    ell2._print()
    return None

if __name__ == "__main__":
    main()
```


## magic function  
```python
# Fraction class
class _Fraction():
    # 1. class variables
    # 2. instance variables
        # den(분모), num(분자)
    # 3. constructors
    
    def __new__(cls,*args,**kwargs):
        this = super(_Fraction,cls).__new__(cls)
        return this
    def __init__(self,n = 1,d = 1): # 분모는 0일수 없다는데 유의
        self.den_ = d
        self.num_ = n
        return None

    # print a fraction
    def _print(self):
        print(str(self.num_)+"/"+str(self.den_))
        return None

    def _get_den(self,d):
        print("den =", self.den_)
        return None
    def _get_num(self,n):
        print("num =",self.num_)
        return None

    # addition
    def _add(self,rhs):
        den = self.den_ * rhs.den_
        num = self.num_ * rhs.den_ + rhs.num_ * self.den_
        return _Fraction(num,den)
    
    # def subtract
    def _subtract(self,rhs):
        den = self.den_ * rhs.den_
        num = self.num_ * rhs.den_ - rhs.num_ * self.den_
        return _Fraction(num,den)

    # def multiply
    def _multiply(self, rhs):
        den = self.den_*rhs.den_
        num = self.num_*rhs.num_
        return _Fraction(num,den)

    # def div
    def _div(self, rhs):
        den = self.den_*rhs.num_
        num = self.num_*rhs.den_ 
        if rhs.num_ == 0:
            print('cant divde by 0')
        return _Fraction(num,den)

    ### magic function
    def __add__(self, rhs):
        den = self.den_ * rhs.den_
        num = self.num_ * rhs.den_ + rhs.num_ * self.den_
        return _Fraction(num,den)
    
    def __mul__(self, rhs):
        den = self.den_*rhs.den_
        num = self.num_*rhs.num_
        return _Fraction(num,den)
    
    def __str__(self):
        fraction = str(self.num_) + "/" + str(self.den_)
        return fraction


def main():
    f1 = _Fraction(1,2) # 1/2
    f2 = _Fraction(3,4) # f2 = 3/4
    print("f1 =", f1)
    ####
    f3 = f1 + f2
    f3._print()
    f4 = f1 * f2
    f4._print()
    return None

if __name__=="__main__":
    main()
```

```python
# Complex class
class _Complex():
    # class variables & instance variables
    __i_symbol = 'i'
    # constructors
    def __new__(cls,*args):
        obj = super(_Complex,cls).__new__(cls)
        return obj
    def __init__(self, r=0, i=0):
        self.real_ = r # real part
        self.imag_ = i # imaginary part
        return None

    # methods
    def _add(self, rhs):
        # your code
        r = self.real_ + rhs.real_
        i = self.imag_ + rhs.imag_
        return _Complex(r, i)

    # magic functions
    def __add__(self, rhs):
        #same as add
        r = self.real_ + rhs.real_
        i = self.imag_ + rhs.imag_
        return _Complex(r, i)

    def __str__(self):
        cpx = str(self.real_) +"+" + str(self.imag_)+_Complex.__i_symbol
        return cpx

def main():
    c1 = _Complex(1,2) # c1 = 1+2i
    c2 = _Complex(3,4) # c2 = 3+4i
    c3 = c1 + c2 # c3 = 4+6i
    print(c3)
    return None

if __name__ == "__main__":
    main()
```