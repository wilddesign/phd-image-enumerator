'use strict';

const fs = require('fs'),
    path = require('path');
//count files of .tif type and rename them so that their names form a sorted series without holes
let howManyTifs = 0;
let foundTifs = [];
  fs.readdir(__dirname, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (path.extname(file) == ".tif") {
          howManyTifs++;
          foundTifs.push(parseInt(file.slice(0, -4)));// remove the extension, just file name
      }
    });
    //sort the foundTifs array so that renaming is begun with the fiel with the highest name label
    foundTifs.sort((a,b) => (b-a));
    console.log(howManyTifs+' tif files found.');
    if(howManyTifs && process.argv[2] > 0){
      foundTifs.forEach((file, index) => {

        try {
          if (fs.existsSync('./'+file+'.tif') && file>process.argv[2]) {
            fs.renameSync('./'+file+'.tif', './'+(file+1)+'.tif', function(err) {
              if ( err ) console.log('ERROR: ' + err);
            });
          }
        } catch(err) {
          console.error(err)
        }
      });
    }
  }
});
