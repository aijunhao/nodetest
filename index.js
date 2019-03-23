const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = 8000
const hostname = '127.0.0.1'

var app = express()

// 模板引擎
app.engine('html', require('express-art-template'))
// 视图模板目录
app.set('views', path.join(__dirname, 'views'))

// 公共目录
app.use('/public/', express.static(path.join(__dirname, 'public')))
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules')))

// 配置 post 中间件
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 配置 session 中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由
app.use(router)

app.listen(port, hostname, () => {
  console.log(`服务器启动成功，通过 http://${hostname}:${port}/ 访问`)
})
