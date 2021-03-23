//module.exports = () => {
  // ...
//};


const fs = require('fs');
const path = require('path');
const marked = require("marked");
const chalk = require('chalk');

let file = process.argv[2];


if (path.parse(file).ext === '.md'){

let links = [];
fs.readFile(file, (err, data) => {
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
  console.log(chalk.blue(link.href), chalk.gray(link.text))
})
});
} else {
  console.log(chalk.bold.red('Por favor ingresa la ruta a un archivo .md'))
}




