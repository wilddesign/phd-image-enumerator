# phd-image-numerator
<img src="https://github.com/wilddesign/phd-image-enumerator/blob/main/logo90.png"/>

## Auto image numbering for scientific papers.

All you need is a folder with the structure images saved as .tif files, from 1.tif, 2.tif, 3.tif,..... N.tif. You copy the program file, run it, and you get 1.svg, 2.svg, 3.svg,..., N.svg vector editable graphics. Each of these has its own assigned number 1, 2, 3, ..., N written above the molecule.

Later you think that molecule 2 should be removed? So you just remove 2.tif from the folder and run the program again. Done.
Adding structures between 1.tif and 2.tif is possible. Just run:

```
nodejs phd-set-tif-apart.js x
```
where x is a number, specifying where a space for another .tif will be created. So:
there are files 1.tif, 2.tif, 3.tif.
You run:
```
nodejs phd-set-tif-apart.js 2
```
and the folder content is as follows:
1.tif, 2.tif, 4.tif.
With empty space for 3.tif created.


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

# phd-reaction-arrow-generator
<img src="https://github.com/wilddesign/phd-image-enumerator/blob/main/ar_result_filename.png"/>

## Auto reaction arrow SVG generation for scientific papers.

Run:
```
nodejs phd-reaction-arrow.js "text_above_arrow" 450 "text_under_arrow" result_filename.svg
```
Arrow length set at 450 px. ar_result_filename.svg file is generated.

# phd-reaction-scheme-generator
<img src="https://github.com/wilddesign/phd-image-enumerator/blob/main/sgen_res.png"/>

## Auto reaction scheme SVG generation for scientific papers.

Once the numbered structures and a reaction arrow are generated, it's time to combine them.
1. Transform the chosen .svg files to .png files.
2. Merge them into one with appropriately positoned elements.
3. Transform it back to .svg for further edition.

Run:
```
nodejs phd-topngs.js 1 arrow1 2
```
It will transform 1.svg, arrow1.svg and 2.svg into corresponding .png files.
Then:
```
nodejs phd-mergepngs.js 1 arrow1 2 res
```
This one will merge appropriately positioned 1.png, arrow1.png and 2.png into res.png file.
And finally:
```
nodejs phd-parse-png-to-svg.js res
```
This one will transform res.png to sgen_res.svg for further edition.

The sgen_ file is an svg file that can be edited in Inkscape or a similar program.


# File removal tools

 If you need to delete all old generated numbered .svg structures, run:
 ```
 nodejs phd-delete-generated-svgs.js
 ```
