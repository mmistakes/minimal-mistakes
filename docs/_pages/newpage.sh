echo "page title: (ex: My Projects)"
read title
#echo "filename is lowercase and -'d title, i.e. my-portfolio"
name=${title,,} #to lower case
file=${name// /-}.md #replace spaces with - and adds .md
echo "page permalink (/input/): "
read permalink
permalink=${permalink// /-} #replace spaces with -
cp pageheader.txt $file
echo created $file
cat "$file" | sed -e "s/temptitle/$title/" -e "s/temp-permalink/$permalink/" > "$file"
sleep 0.6s
