const path = require('path');
const fs = require('fs');

const filename = path.join(__dirname, '../01-read-file', 'text.txt');

const stream = new fs.ReadStream(filename, 'utf-8');

stream.on('readable', (error) => {
  if (error) throw error;
  const data = stream.read();
  if (data !== null) console.log(data);
});
