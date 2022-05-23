let fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'project-dist');

fs.mkdir(directory, { recursive: true }, err => {
  if (err) throw err;
});

const filePath = path.join(__dirname, 'project-dist', 'style.css');
const styleFile = path.join(__dirname, 'styles');
const streamWrite = fs.createWriteStream(filePath);

const indexHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const streamWriteIndexHtml = fs.createWriteStream(indexHtmlPath);

// const htmlFiles = path.join(__dirname, 'components');

const indexHtmlFile = path.join(__dirname);
console.log(indexHtmlFile);
// const readline = require('readline');










async function copyFile(pathFile, streamPath, fileName) {
  fs.readdir(pathFile, (err, files) => {
    const a = sortedFiles(files);
    if (err) throw err;
    a.forEach(file => {
      fs.stat(`${pathFile}/${file}`, (error, f) => {
        if (error) throw error;
        if (f.isFile() && file.split('.').pop() === fileName) {
          let data = '';
          const allPath = path.join(pathFile, file);
          const stream = fs.createReadStream(allPath, 'utf-8');
          stream.on('data', (chunk) => {
            data += chunk;
            streamPath.write(`${data}\n`);
          });
        }
      });
    });
  });

}



async function readIndexFile() {
  const file = path.join(__dirname, 'project-dist');
  fs.readdir(file, (err, files) => {
    console.log(files[0]);
    const indexFile = path.join(file,);
    console.log(indexFile);
    const stream = fs.readFile(files[0], 'utf-8');
    // console.log(stream);
    read(stream);
  });






  //   // console.log(files);
  //   // const a = sortedFiles(files);
  //   // console.log(a);
  //   if (err) throw err;

  //   files.forEach(file => {
  //     fs.stat(`${styleFile}/${file}`, (error, f) => {
  //       if (error) throw error;
  //       if (f.isFile()) {
  //         if (file.split('.').pop() === 'css') {
  //           let data = '';
  //           const allPath = path.join(styleFile, file);
  //           const stream = fs.createReadStream(allPath, 'utf-8');
  //           stream.on('data', (chunk) => {
  //             data += chunk;
  //             streamWrite.write(`${data}\n`);
  //           });
  //         }
  //       }
  //     });
  //   });
  //   });
}
function read(stream) {
  let data = '';
  stream.on('data', chunk => data += chunk);
  stream.on('end', () => console.log('kk', data));
  stream.on('error', error => console.log(error.message));
}

function sortedFiles(files) {
  const arr = [];
  files.forEach(file => {
    if (file.split('.')[0] === 'header') arr.push(file);
  });
  files.forEach(file => {
    if (file.split('.')[0] !== 'header' && file.split('.')[0] !== 'footer') arr.push(file);
  });
  files.forEach(file => {
    if (file.split('.')[0] === 'footer') arr.push(file);
  });

  return arr;
}



async function createAssets() {
  const directory = path.join(__dirname, 'assets');
  const copyDirectory = path.join(__dirname, 'project-dist', 'assets');

  fs.mkdir(copyDirectory, { recursive: true }, err => {
    if (err) throw err;
  });

  fs.readdir(directory, (error, files) => {
    if (error) throw error;
    files.forEach(f => {
      const copyFiles = `${copyDirectory}/${f}`;
      fs.mkdir(copyFiles, { recursive: true }, err => {
        if (err) throw err;
      });
      const pathDir = path.join(directory, f);
      fs.readdir(pathDir, (error, fil) => {
        fil.forEach(i => {
          const fileDir = path.join(pathDir, i);
          const fileCopyDir = path.join(copyFiles, i);
          fs.copyFile(fileDir, fileCopyDir, error => {
            if (error) throw error;
          });
        });
      });
    });
  });
}


(async () => {
  await copyFile(indexHtmlFile, streamWriteIndexHtml, 'html');
  await copyFile(styleFile, streamWrite, 'css');
  createAssets();
  // readIndexFile();
})();
