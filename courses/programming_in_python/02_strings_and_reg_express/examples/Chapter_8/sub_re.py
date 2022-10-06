import re
my_dir = ['image_01.png', 'image_02.png', 'image_03.png', 'image_04.png', 'image_05.png']
for i in range(len(my_dir)):
    my_dir[i] = re.sub('image', 'my_dog', my_dir[i])
print(my_dir)