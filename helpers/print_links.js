const process = require('process');
const chalk = require('chalk');
const showLinks = require('./get_links.js');
const validate = require('./validate.js');

const printLinks = (path) => {
  showLinks(path).then((links)=> {
      const numberOfLinks = links.length
  links.forEach((link) => {
  if (process.argv[3] === '--validate'){
      validate(link).then((validated)=> {
          console.log(chalk.gray(path), chalk.underline(validated.href), validated.statusText == 'OK' ? chalk.bold.green(validated.statusText) : chalk.bold.red(validated.statusText), validated.status, validated.text)
      })
      .catch(() => 'error')
  } else {
      console.log(path, link.href, link.text)
  }})
  console.log('Links:' +numberOfLinks);
 })
 .catch(() => 'error')
}

  module.exports = printLinks;

