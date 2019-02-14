import Koa from 'koa'
import ip from 'ip'
import conf from './config'
import router from './router'
import middleware from './middleware'
import './mongodb'

const app = new Koa()
middleware(app)
router(app)

// 允许跨域设置
const cors = require('koa-cors');
app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 500,
    credentials: true,  //cookie
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.listen(conf.port, '0.0.0.0', () => {
    console.log(`${conf.env} : server is running at http://${ip.address()}:${conf.port}`)
})