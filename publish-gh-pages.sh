#!/bin/bash

function exe_cmd() {
    echo $1
    eval $1
}


dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
exe_cmd "cd $dir/build"
exe_cmd "bundle exec jekyll b"
exe_cmd "cp -r _site/* ../"
exe_cmd "cd .."
exe_cmd "touch .nojekyll"

# exe_cmd "jekyll build"
# if [ ! -d '_site' ];then
#     echo "not content to be published"
#     exit
# fi

# exe_cmd "git checkout $branch"
# error_code=$?
# if [ $error_code != 0 ];then
#     echo 'Switch branch fail.'
#     exit
# else
#     ls | grep -v _site|xargs rm -rf
#     exe_cmd "cp -r _site/* ."
#     exe_cmd "rm -rf _site/"
#     exe_cmd "touch .nojekyll"
# fi