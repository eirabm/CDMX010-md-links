//module.exports = () => {
  // ...
//};


const fs = require('fs');
const path = require('path');
const marked = require("marked");
const chalk = require('chalk');

let inputPath = process.argv[2];

function getFiles(filepath){
  if (path.parse(inputPath).ext === '.md'){
    showLinks(filepath);
  } else {
  let input = fs.readdirSync(filepath);
  input.forEach((file) => {
  let thisFilePath = filepath + '\\' + file;
  if(path.parse(thisFilePath).ext === '.md'){
    showLinks(thisFilePath)
  } else{
  let thisFilePath = inputPath + '\\' + file;
  getFiles(thisFilePath)
  }
})
}}

getFiles(inputPath);  


function showLinks(selectedFiles){

  let links = [];
  fs.readFile(selectedFiles, (err, data) => {
  if (err) {console.log(err)}
  document = data.toString();
  
  /*const walkTokens = (token) => {
    if (token.type === 'link'){
      console.log(token)
    } else {''}
  }
   marked.use({walkTokens})*/
  
   const renderer = new marked.Renderer();
   renderer.link = (href, title, text) => {
     links.push({ href, title, text })
   }
  
   marked.use({ renderer });
  
  marked(document);
  
  links.forEach((link) => {
    console.log(chalk.magenta(selectedFiles), chalk.blue(link.href), chalk.gray(link.text))
  })
  });

}