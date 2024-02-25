#!/bin/bash

###
# format src
###
function format() {
    npm run format
    return $?
};

###
# format test
###
function format_test() {
    npm run format:test
    return $?
};

###
# lint src
###
function lint() {
    npm run lint
    return $?
};

###
# lint test
###
function lint_test() {
    npm run lint:test
    return $?
};

###
# テスト
###
function test() {
    npm test
    return $?
};

command=$1;
shift 1;

if [ "$command" == "format" ]; then
    format "$@";
    format_test "$@";
elif [ "$command" == "lint" ]; then
    lint "$@";
    lint_test "$@";
elif [ "$command" == "test" ]; then
    test "$@";
fi