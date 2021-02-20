'use strict';

const fs = require('fs'),
    path = require('path');
    //count files of .tif type and rename them so that their names form a sorted series without holes
    let howManyTifs = 0;
      fs.readdir(__dirname, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          if (path.extname(file) == ".tif") {
              howManyTifs++;
          }
        });
        if(howManyTifs && process.argv[2] > 0){
          for (let k=howManyTifs; k>process.argv[2]; k--){
            // take the file and rename it to nr+5
            fs.renameSync('./'+(k)+'.tif', './'+(k+5)+'.tif', function(err) {
              if ( err ) console.log('ERROR: ' + err);
            });
          }
        }
      }
    });


/*
      const config = {
        x: 0,
        y: -10,
        fontSize: 50,
        fontFamily: "Arial, Helvetica, sans-serif"
      }

      let iMax = howManyTifs;
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

            //look for middles
          //  i += findMiddles(sourcePath, config, i, empties);
            //console.log(i);
          } else {
            //iMax++; //if the file not found, we must do the main loop longer
            empties++; //

          //  i += findMiddles(sourcePath, config, i, empties);
          }
        } catch (e) {
          //if neither file nor a middle is found, it is still ok
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

/*function findMiddles(path, conf, index, empties){
  let middles = 0;//console.log('./'+index+'.'+(middles+1)+'.tif');
  do {
    if(fs.existsSync('./'+index+'.'+(middles+1)+'.tif')) {//console.log('found./'+index+'.'+(middles+1)+'.tif');
    //console.log('./'+index+'.'+(middles+1)+'.tif', index+middles+1, empties);
  //  console.log('argument path jest: ', './'+index+'.'+(middles+1)+'.tif');
  //  let newPath = ;
    console.log('newPath ','./'+index+'.'+(middles+1)+'.tif');
        getTifAndMakeSvg('./'+index+'.'+(middles+1)+'.tif', config, index+middles+1, empties);
        middles++;
    }
  } while (fs.existsSync('./'+index+'.'+(middles+1)+'.tif'));
  return middles;
}

function generateStyledIndex (configs, number, empties) {
  return '<text x=\"'+configs.x+'\" y=\"'+configs.y+'\" font-size=\"'+configs.fontSize+'\" font-family=\"'+configs.fontFamily+'\">'+(number-empties)+'</text></svg>';
}
*/
