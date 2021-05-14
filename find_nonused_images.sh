#!/bin/bash

dir=("assets/images" "assets/images/categories")

for d in "${dir[@]}"; do
    for i in $(ls $d); do
        if ! grep -rq $i _posts/; then
            if ! grep -rq $i _pages/; then
                if ! grep -rq $i _config.yml; then
                    if ! grep -rq $i index.html; then
                        if [ $i != "filler" ]; then
                            mv $d/$i "assets/images/filler/"
                        fi
                    fi
                fi
            fi
        fi
    done
done

for i in $(ls "assets/images/filler/"); do
    if grep -rq $i _posts/; then
        echo "File being used: assets/images/filler/${i}"
    elif grep -rq $i _pages/; then
        echo "File being used: assets/images/filler/${i}"
    elif grep -rq $i _config.yml; then
        echo "File being used: assets/images/filler/${i}"
    elif grep -rq $i index.html; then
        echo "File being used: assets/images/filler/${i}"
    fi
done
