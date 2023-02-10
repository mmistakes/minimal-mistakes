---
layout: single
title: python-study-04 python file
tags: python
---

## python file  
```python
def main():
    f_path = "C:/test/python/" # 현재 디렉토리 밑에있는 (./)
    f_name = "test.txt"
    f_mode = "r" # r : read , w : write
    fhandle = open(f_path + f_name, f_mode) #f_path + f_name 합치면 디렉토리 문자열이 된다
    # C:\test\python\test.txt
    print("Handle : ", fhandle)

if (__name__ == "__main__"):
    main()
```


## python file open and read  
```python
#file open and read
def main():
    fpath = "C:/test/python/"
    fname = "Byron.txt"
    fmode = "r"
    # create a handle
    # fpath + fname = C:/test/python/Byron.txt
    fhandle = open(fpath + fname, fmode)

    '''for a_line in fhandle: #for문은 알아서 다 읽어준다 read 필요 x
        print(a_line)'''
    list_of_words = [] #=["when","we","to"]
    while(True): #while statement + readline() => end of file check=>break
        a_line_of_strings = fhandle.readline()
        #print(output)

        split_string = a_line_of_strings.split(" ")
        list_of_words = list_of_words + split_string
        
        if a_line_of_strings=="":
            break
            
    print(list_of_words)    
    #print("Handle = ", fhandle)

    '''
    output = fhandle.read(32) #문자단위
    # 읽고 나면 파일 포인터가 읽은 위치까지 간다
    print(output)
    output = fhandle.readline() #한줄
    print(output)'''

    fhandle.close()
    return None

if __name__=="__main__":
    main()
```

```python
#file open and read
def main():
    fpath = "C:/test/python/"
    fname = "Byron.txt"
    fmode = "r"
    # create a handle
    # fpath + fname = C:/test/python/Byron.txt
    fhandle = open(fpath + fname, fmode)

    while(True):
        output = fhandle.readline()
        print("Now I am at...",fhandle.tell())
        if(output==""):
            # move the file ptr to the head (offset,from) where from 0,1,2 &offset
            fhandle.seek(0, 0) 
            
            break
        print(output)

    output2 = fhandle.read()
    print("Output2 = ",output2)

    # close
    fhandle.close()
    return None

if __name__=="__main__":
    main()
```


## python file writing
```python
# file writing
def main():
    # fpath, fname, wmode = "./", "test_copy1.txt", "w"
    fpath, fname, wmode = "./", "test_copy2.txt", "w"
    fhandle = open(fpath + fname, wmode)

    # a_string = "A sample string"
    a_string = "A sample string\n"
    for i in range(5):
        fhandle.write(str(i) + ":" + a_string)
    # 파일쓰기는 문자열밖에 저장이 안됨.
    fhandle.close()

    '''
    # a list of strings
    a_line_of_strings = [a_string+"1\n",a_string+"2\n",a_string+"3\n"]
    fhandle = open(fpath+fname, wmode)
    fhandle.writelines(a_line_of_strings)
    fhandle.close()
    '''
    return None

if __name__=="__main__":
    main()
```