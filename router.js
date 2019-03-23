var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

// 首页
router.get('/', (req, res) => {
  console.log('session.user：', req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

// 注册页面
router.get('/register', (req, res) => {
  res.render('register.html')
})

// 注册页面处理
router.post('/register', (req, res) => {
  // 获取数据对象
  var body = req.body

  // 操作对象
  // 判断邮箱、昵称是否重复
  User.findOne({
    $or: [
      { email: body.email }, { username: body.username }
    ]
  }).then(
    data => {
      if (data) {
        if (data.email === body.email) {
          // 邮箱已存在
          console.log('邮箱: ' + data.email + ' 已存在')
          res.status(200).json({
            err_code: 1,
            message: '邮箱已存在'
          })
        } else {
          // 用户名已存在
          console.log('用户名: ' + data.username + ' 已存在')
          res.status(200).json({
            err_code: 2,
            message: '用户名已存在'
          })
        }
      } else {
        // 都不存在，插入数据
        console.log('有用用户名、邮箱有效。')

        // 对密码进行重复加密
        body.password = md5(md5(body.password))

        // 传给 then
        return new User(body).save()
      }
    },
    () => {
      console.log('数据查询失败！')
      res.status(500).json({
        err_code: 500,
        message: '服务端错误，数据查询失败！'
      })
    }
  ).then(
    data => {
      if (data) {
        console.log('数据存储成功！')

        // 注册成功，使用 session 记录用户信息，用以登录
        req.session.user = data

        // 返回状态码
        res.status(200).json({
          err_code: 0,
          message: 'OK'
        })
      }
    },
    () => {
      console.log('数据保存失败！')
      res.status(500).json({
        err_code: 500,
        message: '服务端错误，数据保存失败！'
      })
    }
  )

  // 注册

  // 注册完成返回数据
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('login.html')
})

// 登录页面处理
router.post('/login', (req, res) => {
  // 请求，获取表单数据
  console.log(req.body)
  var body = req.body

  // 处理，查询数据库校验，先查邮箱用户名，然后密码
  User.findOne({
    $or: [
      { email: body.login_user }, { username: body.login_user }
    ]
  }).then(
    user => {
      if (user) {
        if (user.email === body.login_user && user.password === md5(md5(body.password))) {
          req.session.user = user
          res.status(200).json({
            err_code: 0,
            message: '登录成功'
          })
        } else {
          res.status(200).json({
            err_code: 2,
            message: '密码错误'
          })
        }
      } else {
        console.log('未查到指定用户，邮箱或用户名错误！')
        res.status(200).json({
          err_code: 1,
          message: '邮箱或用户名错误！'
        })
      }
    },
    () => {
      res.status(500).json({
        err_code: 500,
        message: '服务器忙！'
      })
    }
  )

  // 响应
})

// 退出页面
router.get('/logout', (req, res) => {
  // 清除登录状态
  req.session.user = null
  // 重定向
  res.redirect('/login')
})

module.exports = router
