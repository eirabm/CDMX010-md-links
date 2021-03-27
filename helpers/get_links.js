const fs = require('fs');
const marked = require("marked");
const chalk = require('chalk');


const showLinks = (selectedFiles) => {

    const linksOb = fs.promises.readFile(selectedFiles)
    .then((data) => {
      document = data.toString();
      
      /*const walkTokens = (token) => {
        if (token.type === 'link'){
          console.log(token)
        } else {''}
      }
       marked.use({walkTokens})*/
       let links = [];
  
       const renderer = new marked.Renderer();
       renderer.link = (href, title, text) => {
        links = [].concat(...links, {href, title, text})
  
       }
      
       marked.use({ renderer });
      
      marked(document);

       return links;
      })

      return linksOb;
    }
    


  module.exports = showLinks;