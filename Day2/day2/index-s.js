const fs = require('fs')

const readStream = fs.createReadStream('./todos.json');
readStream.pipe(process.stdout)




