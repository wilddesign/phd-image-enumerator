#!/usr/bin/env bash

echo "PHD-Image generation scripts install for Linux"
sudo apt update
sudo apt install git
git clone https://github.com/wilddesign/phd-image-enumerator.git

sudo apt install nodejs
sudo apt install npm
npm install potrace
npm install merge-images
npm install image-size
npm install canvas
