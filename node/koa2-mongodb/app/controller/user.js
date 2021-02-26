const User = require('../dbHelper/user')

exports.query = async function(ctx, next) {
  let res = await User.queryUsers()
  // console.log('--router-1-res--', res)
  let result = {
  	code:200,
  	response: res || {},
  	ts: 12345
  }
  ctx.response.body = result
}