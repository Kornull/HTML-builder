const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');


fs.readdir(filePath, (error, files) => {
  if (error) throw error;
  files.forEach(f => {
    fs.stat(`${filePath}/${f}`, (error, file) => {
      if (file.isFile()) {
        const allFileName = f.split('.');
        console.log(`${allFileName[0]} - ${allFileName[1]} - ${file.size / 1000}kb`);
      }
      if (error) throw error;
    });
  });
});
