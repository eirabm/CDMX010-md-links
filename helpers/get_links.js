const fs = require('fs');
const marked = require("marked");

const showLinks = (selectedFiles) => {

    const linksOb = fs.promises.readFile(selectedFiles)
    .then((data) => {
      let document = data.toString();

       let links = [];
  
       const renderer = new marked.Renderer();
       renderer.link = (href, title, text) => {
        links = [].concat(...links, {href, title, text})
  
       }
      
       marked.use({ renderer });
      
      marked(document);

       return links;
      }).catch((err) => console.log(err))

      return linksOb;
    }
    


  module.exports = showLinks;