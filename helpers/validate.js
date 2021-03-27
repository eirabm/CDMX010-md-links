const fetch = require('node-fetch');

/*function validate (linkToValidate){
    https.get(linkToValidate, (res) => {
  
      const { statusCode } = res;
  
      if ( statusCode == 400){
        console.log(chalk.red(`fail ${statusCode}`))
      } else {
        console.log(chalk.green(`ok ${statusCode}`))
      }
      
    })
    .on('error', ()=> {
      console.log(chalk.red('fail'))
    })
  }*/

const validate = (linkOb) => {
  const validation = fetch(linkOb.href)
  .then((res)=>{
  let status = {status: res.status, statusText: res.statusText,};
  let objWithStatus = Object.assign(linkOb, status)
  return objWithStatus;
})
  .catch(() => {
    let status = {status: 'x', statusText: 'Este no es un link valido',};
    let brokenObj = Object.assign(linkOb, status)
    return brokenObj;
  })

  return validation;
}

module.exports = validate;