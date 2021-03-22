//module.exports = () => {
  // ...
//};

const fs = require('fs');
const path = require('path');
const marked = require("marked");

let links = [];
fs.readFile('./README.md', (err, data) => {
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
  console.log(link.href, link.text)
})
});



  const thisPath = path.parse('./README.md');

  console.log(thisPath.ext)



