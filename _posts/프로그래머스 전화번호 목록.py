import sys

def solution(phone_book):
    answer = True
    
    phone_book.sort(key = len)
    if len(phone_book[0]) == len(phone_book[len(phone_book) - 1]):
        return True
    phone_book.sort()
    for i in range(len(phone_book)):
        for j in range(i + 1, len(phone_book)):
            if len(phone_book[i]) == len(phone_book[j]):
                continue
            if phone_book[j].startswith(phone_book[i]):
                return False

    

    return answer

phone_book = ["119","20","115524421"]

print(solution(phone_book))