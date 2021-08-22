#!/bin/bash

for i in $(ls assets/images/ -p | grep -v /); do
  if ! grep -r $i --quiet *
  then
    ls  assets/images/$i
  fi
done

for i in $(ls assets/images/categories -p | grep -v /); do
  if ! grep -r $i --quiet *
  then
    ls assets/images/categories/$i 
  fi
done
