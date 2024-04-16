const onerror = require('koa-onerror')
const app = require('./routes/index')
// error handler
app.use(require('koa-static')(__dirname + '/public'))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
console.log(222)
module.exports = app
