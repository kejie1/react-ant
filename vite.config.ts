/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 09:38:12
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 16:06:26
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':join(__dirname,'src'),
    }
  },
  server:{
    port:8080,
    hmr:true,
    host:'10.44.9.204'
  }
})
