const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'project-dist', 'bundle.css');
const streamWrite = fs.createWriteStream(filePath);

const styleFile = path.join(__dirname, 'styles');


(async () => {
  fs.readdir(styleFile, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.stat(`${styleFile}/${file}`, (error, f) => {
        if (error) throw error;
        if (f.isFile()) {
          if (file.split('.').pop() === 'css') {
            let data = '';
            const allPath = path.join(styleFile, file);
            const stream = fs.createReadStream(allPath, 'utf-8');
            stream.on('data', (chunk) => {
              data += chunk;
              streamWrite.write(`${data}\n`);
            });
          }
        }
      });
    });
  });
})();

