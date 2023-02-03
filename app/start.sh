#!/bin/sh

echo $FLAG > /tmp/flag.txt
echo $(cut -c -20 /tmp/flag.txt) > /flag1
echo $(cut -c 21- /tmp/flag.txt) > /flag2

rm /tmp/flag.txt
export FLAG=not_flag
FLAG=not_flag


rm -f ./start.sh
node main.js
