'use strict';

/*
take svg files, make tif or png with them, merge them, revert to svg and remove generated source tif files
use merge-images and image-size from npm for positioning
algorithm of positioning is as follows:
take the heighth of the highest png, calculate its half
then the arrow is at the half-half oth the arrow's height
then the position of the product is calculated the same way
*/

const sharp = require("sharp");
const is = require('image-size');

if (process.argv.length<5){
  console.error('Error, too few arguments');
  process.exit();
}
//load substrate, load arrow, load product and merge them in appropriate positions in one svg file
console.log('Files selected:');
console.log(process.argv[2], process.argv[3], process.argv[4]);
let images = [];

for(let i = 2; i<process.argv.length; i++){
  sharp(process.argv[i] +'.tif')
    .png()
    .toFile(process.argv[i] +'.png')
    .then(function(info) {
      console.log(info)
      let dimPNG = is(process.argv[i] +'.png');
      images.push({
        width: dimPNG.width,
        height: dimPNG.height
      });
    })
    .catch(function(err) {
      console.log(err)
    })
  //check if the file exists, if not, throw exception
  /*try {
    if (fs.existsSync(sourcePath)) {
      potrace.posterize(sourcePath, {threshold: 180, steps: 4}, function(err, svg) {
        if (err) throw err;
        let destPath ='./unnumerated'+process.argv[i]+'.svg';
        fs.writeFileSync(destPath, svg);
      })
    } else {
      throw "Error: file not found. Check the filename again. Do not add the file extension. It assumes a .tif file already";
    }
  } catch (e) {
    console.error(e);
  }*/
}




  /*

const { parse, stringify } = require('svgson');
const tools = require('simple-svg-tools');
const fs = require('fs');


*/


/*
let sizes = [];

//load
fs.readFile(process.argv[2]+'.svg', 'utf8', function(err, data) {
    if (err) throw err;
    //console.log(data);
    let svg = new tools.SVG(data);
    //console.log(svg.width);
  //  console.log(svg.height);
    sizes.push({
      width : svg.width,
      height : svg.height
    });

    parse(data).then(json => {
    //  console.log(JSON.stringify(json, null, 2))
      const mysvg = stringify(json)
      //console.log(mysvg);
    })
  })/*
});



//load
tools.ImportSVG(process.argv[2]+'.svg').then(svg => {
    // SVG was imported
    // Variable 'svg' is instance of SVG class
    parse(svg).then(json => {
      console.log(json);
  returns the SVG as string
      }).catch(err => {
        console.log(err);
      })
}).catch(err => {
    console.log(err);
});*/

/*
const configs = {
  x: 0,
  y: 50,
  fontSize: 50,
  fontFamily: "Arial, Helvetica, sans-serif"
}

const fs = require('fs')

let svg = ""
svg += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'
svg += '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n'

// add text above arrow
svg += '<text x=\"'+configs.x+'\" y=\"'+configs.y+'\" font-size=\"'+configs.fontSize+'\" font-family=\"'+configs.fontFamily+'\">'+(process.argv[2])+'</text>';
// add the arrow
svg += '<defs>\
<marker id=\"arrowhead\" markerWidth=\"10\" markerHeight=\"7\"\
    refX=\"0\" refY=\"3.5\" orient=\"auto\">\
      <polygon points=\"0 0, 10 3.5, 0 7\" />\
    </marker>\
  </defs>\
  <line x1=\"0\" y1=\"70\" x2=\"'+process.argv[3]+'\" y2=\"70\" stroke=\"#000\"\
  stroke-width=\"4\" marker-end=\"url(#arrowhead)\" />';
// add text below the arrow

svg += '<text x=\"'+configs.x+'\" y=\"'+(configs.y+70)+'\" font-size=\"'+configs.fontSize+'\" font-family=\"'+configs.fontFamily+'\">'+(process.argv[4])+'</text>';


svg += '</svg>'

fs.writeFile('./' + process.argv[5], svg, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log(process.argv[4]+' written!');
});*/

/*
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
}*/
