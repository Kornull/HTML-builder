let fs = require('fs');
const path = require('path');
const { COPYFILE_EXCL } = fs.constants;

const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, `files-copy-${Math.floor(Math.random() * 100)}`);

fs.mkdir(copyDirectory, { recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(directory, (error, files) => {
  if (error) throw error;
  files.forEach(f => {
    const fileDir = path.join(directory, f);
    const fileCopyDir = path.join(copyDirectory, f);
    fs.copyFile(fileDir, fileCopyDir, COPYFILE_EXCL, error => {
      if (error) throw error;
      console.log('File copied');
    });
  });
});