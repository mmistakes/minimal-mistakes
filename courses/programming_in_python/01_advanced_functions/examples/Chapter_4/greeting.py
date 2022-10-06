def greeting(person1, person2, word):
    return "{0} says {1} to {2}".format(person1,word, person2)

print("Calling greeting('Mark', 'Tom', 'Hello!'), and obtains: ",greeting('Mark', 'Tom', 'Hello!') )
print('\n')
print("Calling greeting(word = 'Hi!!!', person2='Janet', person1='Mike'), and obtains: ",greeting(word = 'Hi!!!', person2='Janet', person1='Mike'))