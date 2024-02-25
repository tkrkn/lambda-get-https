#!/bin/bash

###
# テスト
###
function test() {
    npm test
    return $?
};

command=$1;
shift 1;

if [ "$command" == "test" ]; then
    test "$@";
fi