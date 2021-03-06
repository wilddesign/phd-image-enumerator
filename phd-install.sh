#!/usr/bin/env bash

echo "PHD-Image generation scripts install for Linux"
sudo apt update

sudo apt install nodejs
sudo apt install npm
npm install potrace
npm install merge-images
npm install image-size
npm install canvas
