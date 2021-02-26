const router = require('koa-router')()
const User = require('./controller/user')

router.get('/', User.query)

export default router

