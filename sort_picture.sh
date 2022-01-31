#!/bin/bash

for i in $(ls -p assets/images/ | grep -v /); do
  if ! grep -r $i --quiet *
  then
    ls  assets/images/$i
  fi
done

for i in $(ls -p assets/images/categories | grep -v /); do
  if ! grep -r $i --quiet *
  then
    ls assets/images/categories/$i
  fi
done
