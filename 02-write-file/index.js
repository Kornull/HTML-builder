const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const filePath = path.join(__dirname, '../02-write-file', 'text.txt');
const stream = fs.createWriteStream(filePath);

console.log('File created, enter text please:\n');

rl.on('line', (line) => {
  if (line.toLowerCase() !== 'exit') {
    stream.write(`${line}\n`);
  } else {
    rl.close();
  }
});

process.on('exit', () => {
  console.log('\nFile "text.txt" saved.');
});

