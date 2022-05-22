let fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');


fs.mkdir(copyDirectory, { recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(directory, (error, files) => {
  if (error) throw error;
  files.forEach(f => {
    fs.stat(`${directory}/${f}`, (error, file) => {
      if (file.isFile()) {
        const fileDir = path.join(directory, f);
        const fileCopyDir = path.join(copyDirectory, f);
        fs.copyFile(fileDir, fileCopyDir, error => {
          if (error) throw error;
        });
      }
    });
  });
});
