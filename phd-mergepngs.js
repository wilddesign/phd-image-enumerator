'use strict';


const is = require('image-size');
const mi = require('merge-images');
const { Canvas, Image } = require('canvas');
const fs = require('fs');

if (process.argv.length != 6){
  console.error('Error, wrong arguments list. Three pngs for input and one output filename required');
  process.exit();
}
//load substrate, load arrow, load product and merge them in appropriate positions in one png file
console.log('Files selected:');
console.log(process.argv[2], process.argv[3], process.argv[4]);
let images = [];

for(let i = 2; i<(process.argv.length-1); i++){
  let dimPNG = is(process.argv[i] +'.png');
  images.push({
    name: process.argv[i],
    width: dimPNG.width,
    height: dimPNG.height
  });
}
// sort the array by decreasing image height
images.sort((a,b) => {
  return b.height-a.height;
});
let highest = images[0].height;
// create a config object for image merger
let config = [];
let totalWidth = 0;

for(let i = 2; i<(process.argv.length-1); i++){
config.push({
  src: './'+process.argv[i]+'.png',
  x: totalWidth,
  y: 0.5*(highest-images.filter(png => {return png.name == process.argv[i]})[0].height)
});
  totalWidth += images.filter(png => {return png.name == process.argv[i]})[0].width + (20*i);
}

mi(config, {
  Canvas: Canvas,
  Image: Image,
  width: totalWidth,
  height: highest
})
  .then(b64 => {
    let newB64 = b64.replace(/^data:image\/png+;base64,/, "");
    fs.writeFileSync(process.argv[5]+'.png', newB64, 'base64', function(err) {
  console.log(err);
});
  });
