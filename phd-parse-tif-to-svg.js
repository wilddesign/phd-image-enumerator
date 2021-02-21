const potrace = require('potrace'),
    fs = require('fs');

for(let i = 2; i<process.argv.length; i++){
  let sourcePath = './' + process.argv[i] +'.tif';

  //check if the file exists, if not, throw exception
  try {
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
  }
}
