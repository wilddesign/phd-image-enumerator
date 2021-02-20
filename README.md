# phd-image-numerator
<img src="https://github.com/wilddesign/phd-image-enumerator/blob/main/logo90.png"/>
## Auto image numbering for scientific papers.

All you need is a folder with the structure images saved as .tif files, from 1.tif, 2.tif, 3.tif,..... N.tif. You copy the program file, run it, and you get 1.svg, 2.svg, 3.svg,..., N.svg vector editable graphics. Each of these has its own assigned number 1, 2, 3, ..., N written above the molecule.

Later you think that molecule 2 should be removed? So you just remove 2.tif from the folder and run the program again. Done.
Adding structures between 1.tif and 2.tif is under way.

Try to keep the directory clean (as few x.y.tif files as possible). When I have some free time, I rewrite the script to be able to clean the folder itself.

How to install?
It requires:

## Node.js + Potrace package

Ubuntu install: run following commands:
```
sudo apt install nodejs
```
```
sudo apt install npm
```
```
npm install potrace
```
Then just save the .js file in a directory containing 1.tif, 2.tif etc and run:
```
nodejs phd-image-enumerator.js
```
