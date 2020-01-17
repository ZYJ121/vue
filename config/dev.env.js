'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_BASE_URL: '"http://localhost:1211"',  // 需要自己添加的代码
})
