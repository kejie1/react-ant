/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:30:08
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-22 17:37:15
 * @Description: 
 */
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    webpack:{
        alias:{
            '@':path.resolve(__dirname,'src')
        },
        plugins: [new NodePolyfillPlugin()]
    }
}