'use strict';

const potrace = require('potrace'),
    fs = require('fs'),
    path = require('path');

    //count files of .tif type and rename them so that their names form a sorted series without holes
    let maxTif = 0;
    fs.readdir(__dirname, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (path.extname(file) == ".svg")
          maxTif = (parseInt(file.slice(0, -4)) > maxTif)? parseInt(file.slice(0, -4)) : maxTif;
      });

      const config = {
        x: 0,
        y: -10,
        fontSize: 50,
        fontFamily: "Arial, Helvetica, sans-serif"
      }

      let iMax = maxTif;
      let empties = 0;
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
