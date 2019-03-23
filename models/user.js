var mongoose = require('mongoose')
var Schema = mongoose.Schema

const port = 27017
const hostname = '127.0.0.1'
const database = 'test'

mongoose.connect(`mongodb://${hostname}:${port}/${database}`)

var db = mongoose.connection
db.on('error', console.error.bind(console, '数据库连接失败！'))
db.once('open', function () {
  // we're connected!
  // 之后数据库的操作都放在这个方法中
  console.log('数据库连接成功！')
})

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    Date
  },
  status: {
    type: Number,
    // 0 无权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
