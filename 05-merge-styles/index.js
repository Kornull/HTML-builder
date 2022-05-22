const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'project-dist', 'bundle.css');
const streamWrite = fs.createWriteStream(filePath);

const styleFile = path.join(__dirname, 'styles');


(async () => {
  fs.readdir(styleFile, (err, f) => {
    if(err) throw err;
    f.forEach(file => {
      if (file.split('.').pop() === 'css') {
        let data = '';
        const allPath = path.join(styleFile, file);
        const stream = fs.createReadStream(allPath, 'utf-8');
        stream.on('data', (chunk) => {
          data += chunk;
          streamWrite.write(`${data}\n`);
        });
      }
    });
  });
})();

