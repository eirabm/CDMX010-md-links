const fetch = require('node-fetch');


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