const process = require('process');
const chalk = require('chalk');
const showLinks = require('./get_links.js');
const validate = require('./validate.js');
const stats = require('./stats.js');


const getData = (path) => {
  showLinks(path).then((links)=> {
  if (process.argv[3] === '--validate'){    
     return Promise.all(links.map(validate))
      .catch(() => 'error')
  } else{
      return links
  }}).then((linksArr)=> {

    linksArr.forEach((link) =>{
        const colorPath = chalk.gray(path)
        const colorLink = chalk.magenta(link.href)
        const colorText = chalk.blue(link.text)
        const colorStatus = link.statusText == 'OK' ? chalk.bold.green(link.status + ' ' + link.statusText) : chalk.bold.red(link.status + ' ' + link.statusText)
    
        console.log(colorPath, colorLink, link.status ? colorStatus : '', colorText)
    })

      if(process.argv.includes('--stats')){
        const arrStats = stats(linksArr)

        const numberLinks = 'Cantidad de links: ' + chalk.bold(arrStats.length)
        const broken = 'Cantidad de links rotos: ' + chalk.bold.red(arrStats.broken)
        const ok = 'Cantidad de links funcionales: ' + chalk.bold.green(arrStats.ok)

        console.log(numberLinks, '\n', arrStats.broken === 0 && arrStats.ok === 0 ? '' : `${broken} \n ${ok}`)
      }
  })
 .catch(() => 'error')
}

  module.exports = getData;

