const process = require('process');
const chalk = require('chalk');
const showLinks = require('./get_links.js');
const validate = require('./validate.js');
const stats = require('./stats.js');


const printLinks = (path) => {
  showLinks(path).then((links)=> {
  if (process.argv[3] === '--validate'){
     return Promise.all(links.map(validate))
      .catch(() => 'error')
  } else {
      console.log(links)
  }}).then((validatedArr)=> {
      console.log(validatedArr)
        console.log(stats(validatedArr))
  })
 .catch(() => 'error')
}

  module.exports = printLinks;

