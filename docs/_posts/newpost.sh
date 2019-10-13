echo "post title: "
read title
name=${title,,} #to lower case
name=${name// /-}.markdown #replace spaces with - and adds .markdown
printf -v date '%(%Y-%m-%d)T' -1 #gets date and formats it to YYY-MM-DD
file="$date-$name"
cp postheader.txt $file
echo created $file
printf -v datetime '%(%Y-%m-%d %H:%M:%S)T' -1 #gets date and formats it to YYY-MM-DD HH:MM:SS
#replace temptitle with $title, temptime with $datetime
cat "$file" | sed -e "s/temptitle/$title/" -e "s/temptime/$datetime/" > "$file"
sleep 0.6s
