#!/bin/bash

for i in $(ls *test-1*); do
  for t in {6..7}; do
    new_file=$(echo $i | sed s/-1/-$t/)
    cp $i $new_file
    sed -i "s/test-1/test-${t}/g" $new_file
    sed -i "s/Test 1/Test ${t}/g" $new_file
  done
done

#for i in $(ls *test-3*); do
#  new_file=$(echo $i | sed s/-3/-3a-/)
#  cp $i $new_file
#  sed -i "s/test-3/test-3a/g" $new_file
#  sed -i "s/Test 1/Test 3a/g" $new_file
#done
