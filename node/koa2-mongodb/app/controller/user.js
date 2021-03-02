const User = require('../dbHelper/user')


const sumFunction = async function(params1, param2) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(params1 + param2)
    } catch(e) {
      reject(e)
    }
  })
}

exports.query = async function(ctx, next) {
  let res = await User.queryUsers()
  let message = await sumFunction(1, 2)
  // console.log('--sql-res--', res)
  let result = {
  	code:200,
  	data: res || {},
  	message: message
  }
  ctx.response.body = result
}