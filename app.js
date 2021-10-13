const koa = require('koa')
const app = new koa()
const path = require('path')
const request = require('request');

const views = require('koa-views');
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }))

app.use(async(ctx, next) => {
    console.log(ctx.request.path)
    if (ctx.request.path === '/index') { // 首页
        let data = ''
        await requestDemo().then((body) => {
                data = JSON.parse(body)
            })
            // ctx.response.status = 200
            // ctx.response.body = 'index'
        await ctx.render('index', { data })
    } else if (ctx.request.path === '/hello') { // hello页
        ctx.response.status = 200
        ctx.response.body = 'hello world'
    } else {
        ctx.throw(404, 'Not found') // 404
    }
    await next()
})
async function requestDemo() {
    let url = 'https://api.douban.com/v2/user/1000001?apikey=0df993c66c0c636e29ecbb5344252a4a'
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject('接口请求失败')
            }

        })
    });
}

app.listen(3000, function() {
    console.log('koa应用启动！')
})