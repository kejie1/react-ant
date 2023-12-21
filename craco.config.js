/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-20 17:30:08
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-20 17:31:37
 * @Description: 
 */
const path = require('path')

module.exports = {
    webpack:{
        alias:{
            '@':path.resolve(__dirname,'src')
        }
    }
}