'use strict';


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

fs.writeFile('./'+'>'+ process.argv[5], svg, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('>'+ process.argv[5]+' written!');
});
