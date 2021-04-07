/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const getData = require('./helpers/get_data.js');


module.exports = MDLinks = (filepath) => {
  if (path.parse(filepath).ext === '.md'){
    return getData(filepath)
  } else if(path.parse(filepath).ext === ''){
    let input = fs.readdirSync(filepath);
    input.forEach((file) => {
      let thisFilePath = filepath + '\\' + file;
      if(path.parse(thisFilePath).ext === '.md'){
        return getData(thisFilePath)
      } else {
        let thisFilePath = filepath + '\\' + file;
        MDLinks(thisFilePath)
      }
    })
  }
}

