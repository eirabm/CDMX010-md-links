const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const printLinks = require('./helpers/print_links.js');


module.exports = MDLinks = (filepath) => {
  if (path.parse(filepath).ext === '.md'){
    printLinks(filepath);
  } else if(path.parse(filepath).ext === ''){
    let input = fs.readdirSync(filepath);
    input.forEach((file) => {
      let thisFilePath = filepath + '\\' + file;
      if(path.parse(thisFilePath).ext === '.md'){
        printLinks(thisFilePath)
      } else {
        let thisFilePath = filepath + '\\' + file;
        MDLinks(thisFilePath)
      }
    })
  }
}

