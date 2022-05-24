let fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');



(async () => {
  await fs.promises.rm(copyDirectory, { recursive: true });
  await fs.promises.mkdir(copyDirectory);
  const files = await fs.promises.readdir(directory, { withFileTypes: true });
  files.forEach(f => {
    if (f.isFile()) {
      const fileDir = path.join(directory, f.name);
      const fileCopyDir = path.join(copyDirectory, f.name);
      fs.copyFile(fileDir, fileCopyDir, error => {
        if (error) throw error;
      });
    }
  });
  console.log('Copy-File build.');
})();
