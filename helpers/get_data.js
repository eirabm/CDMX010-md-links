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
        const colorPath = chalk.hex('#6c88c4')(path)
        const colorLink = chalk.hex('#cbaacb')(link.href)
        const colorText = chalk.hex('ffffb5')(link.text)
        const colorStatus = link.statusText == 'OK' ? chalk.hex('#00cdac').bold(link.status + ' ' + link.statusText) : chalk.hex('#c05780').bold(link.status + ' ' + link.statusText)
    
        console.log(colorPath, colorLink, link.status ? colorStatus : '', colorText)
    })

      if(process.argv.includes('--stats')){
        const arrStats = stats(linksArr)

        const thisPath = 'En el path ' + chalk.hex('#6c88c4').underline(path) + ' existen:'
        const numberLinks = 'Links: ' + chalk.bold(arrStats.length)
        const broken = 'Links rotos: ' + chalk.hex('#c05780').bold(arrStats.broken)
        const ok = 'Links funcionales: ' + chalk.hex('#00cdac').bold(arrStats.ok)

        console.log('\n', thisPath, '\n', numberLinks, '\n', arrStats.broken === 0 && arrStats.ok === 0 ? '' : `${broken} \n ${ok}`, '\n')
      }
  })
 .catch(() => 'error')
}

  module.exports = getData;

