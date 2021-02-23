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
        if (path.extname(file) == ".tif")
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
        let sourcePath = './'+i+'.tif';
        try {
          if (fs.existsSync(sourcePath)) {
            getTifAndMakeSvg(sourcePath, config, i, empties);

          } else {
            empties++; //
          }
        } catch (e) {
          //if neither file nor a middle is found, it is still ok
          console.log(e);
        }
      }
    }
  })



function getTifAndMakeSvg(path, conf, index, empties) {
  potrace.posterize(path, {threshold: 180, steps: 4}, function(err, svg) {
    if (err) throw err;
    // append number to the svg file
    let txt = generateStyledIndex (conf, index, empties);

    let enlargedSvg = getHigher(svg);
    // find </svg> in the file and replace with txt
    let newSvg = enlargedSvg.replace("</svg>", txt);
    let destPath = path.replace(".tif", ".svg");
    fs.writeFileSync(destPath, newSvg);
  })
}

function getHigher(svg){
  // make the svg a bit higher fo fit the text into it
  let heightAttr = svg.match(/height=\"[0-9]+/);
  //parse heightAttr
  let newHeight = parseInt(heightAttr[0].replace("height=\"","")) + 90;
  return svg.replace(/height=\"[0-9]+/, "height=\"" + newHeight);
}


function generateStyledIndex (configs, number, empties) {
  return '<text x=\"'+configs.x+'\" y=\"'+configs.y+'\" font-size=\"'+configs.fontSize+'\" font-family=\"'+configs.fontFamily+'\">'+(number-empties)+'</text></svg>';
}
