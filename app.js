const koa = require('koa')
const app = new koa()
const path = require('path')

const views = require('koa-views');
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }))

app.use(async(ctx, next) => {
    console.log(ctx.request.path)
    if (ctx.request.path === '/index') { // 首页
        // ctx.response.status = 200
        // ctx.response.body = 'index'
        await ctx.render('index')
    } else if (ctx.request.path === '/hello') { // hello页
        ctx.response.status = 200
        ctx.response.body = 'hello world'
    } else {
        ctx.throw(404, 'Not found') // 404
    }
    await next()
})

app.listen(3000, function() {
    console.log('koa应用启动！')
})