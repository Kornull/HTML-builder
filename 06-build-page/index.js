let fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'project-dist');

// create dir project
fs.mkdir(directory, { recursive: true }, err => {
  if (err) throw err;
});

const filePath = path.join(__dirname, 'project-dist', 'style.css');
const copyDirectory = path.join(__dirname, 'project-dist', 'assets');
const styleFile = path.join(__dirname, 'styles');
const streamWrite = fs.createWriteStream(filePath);

const indexHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const streamWriteIndexHtml = fs.createWriteStream(indexHtmlPath);

const htmlFiles = path.join(__dirname, 'components');

const readline = require('readline');
const directoryPath = path.join(__dirname, 'assets');


// create style.css
async function writeCss() {
  const files = await fs.promises.readdir(styleFile);
  const a = await sortedFiles(files);
  a.forEach(file => {
    fs.stat(`${styleFile}/${file}`, (error, f) => {
      if (error) throw error;
      if (f.isFile() && file.split('.').pop() === 'css') {
        let data = '';
        const allPath = path.join(styleFile, file);
        const stream = fs.createReadStream(allPath, 'utf-8');
        stream.on('data', (chunk) => {
          data += chunk;
          streamWrite.write(`${data}\n\n`);
        });
      }
    });
  });
}


// sorted files css
async function sortedFiles(files) {
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


// copy assets
async function createAssets() {
  await fs.promises.rm(copyDirectory, { recursive: true, force: true });
  await fs.promises.mkdir(copyDirectory);
  const files = await fs.promises.readdir(directoryPath);
  for (let i of files) {
    const assetsFiles = path.join(directoryPath, i);
    const filesAss = await fs.promises.readdir(assetsFiles);
    await fs.promises.mkdir(`${copyDirectory}/${i}`);

    filesAss.forEach(l => {
      const fileDir = path.join(assetsFiles, l);
      const fileCopyDir = path.join(`${copyDirectory}/${i}`, l);
      fs.copyFile(fileDir, fileCopyDir, error => {
        if (error) throw error;
      });
    });
  }
  console.log('Copy file build');
}

// create object html files
const objHtmlFiles = async function () {
  const objHtml = {};
  const files = await fs.promises.readdir(htmlFiles, { withFileTypes: true });
  for (let i of files) {
    const pathHtml = path.join(htmlFiles, i.name);
    const fileText = await fs.promises.readFile(pathHtml, 'utf-8');
    objHtml[i.name.split('.')[0]] = fileText.toString();
  }
  return objHtml;
};

// write index.html
async function writeHtml() {
  const filesText = await objHtmlFiles();
  const dir = path.join(__dirname, 'template.html');

  const readInterface = readline.createInterface({
    input: fs.createReadStream(dir),
  });
  readInterface.on('line', function (line) {
    for (let a of Object.keys(filesText)) {
      if (line.includes(`{{${a}}}`)) {
        line = filesText[a];
      }
    }
    streamWriteIndexHtml.write(`${line}\n`);
  });
}

// run fnctions
(async () => {
  await writeCss();
  await writeHtml();
  createAssets();
})();
