# phd-image-numerator
[My image](wilddesign.github.com/phd-image-enumerator/logo90.png)
Auto image numbering for scientific papers.

All you need is a folder with the structure images saved as .tif files, from 1.tif, 2.tif, 3.tif,..... N.tif. You copy the program file, run it, and you get 1.svg, 2.svg, 3.svg,..., N.svg vector editable graphics. Each of these has its own assigned number 1, 2, 3, ..., N written above the molecule.

You want to modify the list of compounds? For example, you forgot two molecules which should be between figure 1 and 2. So you add this molecule file to the folder and save them as 1.1.tif and 1.2.tif. The only condition is no gaps permitted. So, files 1.1.tif, 1.2.tif, 1.3.tif are OK, but 1.1.tif, 1.3.tif are not. In this case you have to change the name of 1.3.tif to 1.2.tif. Then you run the program again. Done. 1.1.2.tif is not permitted.
Later you think that molecule 2 should be removed? So you just remove 2.tif from the folder and run the program again. Done.

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
