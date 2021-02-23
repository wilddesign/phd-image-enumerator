'use strict';

const sharp = require("sharp");

if (process.argv.length<5){
  console.error('Error, too few arguments');
  process.exit();
}
//load substrate, load arrow, load product and merge them in appropriate positions in one svg file
console.log('Files selected:');
console.log(process.argv[2], process.argv[3], process.argv[4]);
let images = [];

for(let i = 2; i<process.argv.length; i++){
  sharp(process.argv[i] +'.svg')
    .png()
    .toFile(process.argv[i] +'.png')
    .then(function(info) {
    })
    .catch(function(err) {
      console.log(err)
    })
}
