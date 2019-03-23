

<!-- TOC -->

- [Node 综合 Web 案例](#node-综合-web-案例)
    - [1. 目录结构](#1-目录结构)
    - [2. 模板页](#2-模板页)
    - [3. 路由设计](#3-路由设计)

<!-- /TOC -->

# Node 综合 Web 案例

## 1. 目录结构

```txt
.
|-- app.js
|-- controllers
|-- models					数据模型目录
	|-- user.js				用户的SChemas
|-- node_modules        	第三方包
|-- package.json        	包描述文件
|-- package.lock.json   	第三方包版本锁定文件
|-- public              	公共静态资源
|-- README.md           	项目说明文档
|-- routes              	路由目录，简单项目一个文件即可，复杂项目按功能分
	|-- route.js			路由文件
	|-- session.js			处理登录、退出、注册的路由
|-- views               	视图目录
	|-- _layouts			布局模板目录
		|-- header.html		头部模板
```

## 2. 模板页

## 3. 路由设计

| 路径      | 方法 | get参数 | post参数                | 是否需要登录 | 备注         |
| --------- | ---- | ------- | ----------------------- | ------------ | ------------ |
| /         | GET  |         |                         |              | 渲染首页     |
| /regist   | GET  |         |                         |              | 渲染注册页面 |
| /regist   | POST |         | email/nickname/password |              | 处理注册请求 |
| /login    | GET  |         |                         |              | 渲染登录页面 |
| /login    | POST |         | email/password          |              | 处理登录页面 |
| /logout | GET  |         |                         |              | 处理退出     |

### 4.状态码

|     页面      | err_code 错误码 |        备注        |
| :-----------: | :-------------: | :----------------: |
|  login.html   |        0        |      登录成功      |
|               |        1        | 邮箱或用户名错误！ |
|               |        2        |     密码错误！     |
|               |       500       |     服务器忙！     |
| register.html |        0        |      注册成功      |
|               |        1        |    邮箱已存在！    |
|               |        2        |   用户名已存在！   |
|               |       500       |     服务器忙！     |

