//module.exports = () => {
  // ...
//};


const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const https = require('https');
const showLinks = require('./helpers/get_links.js');
const validate = require('./helpers/validate.js');

let inputPath = process.argv[2];

function getFiles(filepath){
  if (path.parse(filepath).ext === '.md'){
    showLinks(filepath).then((links)=> links.forEach((link) => {
      if (process.argv[3] === '--validate'){
      validate(link).then((validated)=> console.log(filepath, validated.href, validated.statusText == 'OK' ? chalk.bold.green(validated.statusText) : chalk.bold.red(validated.statusText), validated.status, validated.text))
      } else{
      console.log(filepath, link.href, link.text)
          }
    }))
  } else if(path.parse(inputPath).ext === ''){
    let input = fs.readdirSync(filepath);
    input.forEach((file) => {
      let thisFilePath = filepath + '\\' + file;
      if(path.parse(thisFilePath).ext === '.md'){
        showLinks(thisFilePath).then((links)=> links.forEach((link) => {
          if (process.argv[3] === '--validate'){
          validate(link).then((validated)=> console.log(thisFilePath, validated.href, validated.statusText == 'OK' ? chalk.bold.green(validated.statusText) : chalk.bold.red(validated.statusText), validated.status, validated.text))
          } else{
          console.log(thisFilePath, link.href, link.text)
              }
        }))
      } else {
        let thisFilePath = inputPath + '\\' + file;
        getFiles(thisFilePath)
      }
    })
  }else{
  console.log(chalk.bold.red('Por favor ingresa un directorio o archivo .md'))
  }
}

getFiles(inputPath);  


