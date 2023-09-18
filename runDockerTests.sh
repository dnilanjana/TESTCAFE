#!/usr/bin/env bash

# Unfortunately, paths MUST be hard paths- no relative paths - so we have to set it
export UI_PATH=/Users/DBULLA/github/dra/_uitesting/ui-automation

# This will start an interactive shell - then just run the commands as normal.
docker run -it \
 -u root \
 -m=4g \
 -w $UI_PATH \
 -v $UI_PATH:$UI_PATH \
  artifactory.nike.com:9001/cc/node:14.17.6.4 /bin/bash
