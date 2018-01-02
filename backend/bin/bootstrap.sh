#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 {config_file}"
  exit 1
fi


dropdb opa
createdb opa

./bin/initializedb.py $1