#!/bin/sh
rm -rf .git README.md
git init
npm cache clean
npm i