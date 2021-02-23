'use strict';

const fs = require('fs');
const path = require('path');

    //count files of .tif type and rename them so that their names form a sorted series without holes
    let maxSVG = 0;
    fs.readdir(__dirname, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (path.extname(file) == ".svg")
          maxSVG = (parseInt(file.slice(0, -4)) > maxSVG)? parseInt(file.slice(0, -4)) : maxSVG;
      });


      let iMax = maxSVG;
      for(let i=1; i<=iMax; i++){
        // log the progress to the user
        if(i % 10 == 0){
          console.log(i+" done");
        }

        let sourcePath = './'+i+'.svg';
        if (fs.existsSync(sourcePath)) {
          fs.unlinkSync(sourcePath);
        }
      }
    }
  });
