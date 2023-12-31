import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cesium({
      devMinifyCesium: true,
      rebuildCesium: true,
    }),
  ],
  server: {
    host: '0.0.0.0', // 指定监听的IP地址
    port: 3333, // 指定服务器端口
    open: 'http://192.168.10.208:3333', // 开发服务器启动时，自动在浏览器打开
    strictPort: false, // 设为 true 时，若端口已被占用会直接退出，不会尝试下一个可用端口
    https: false, // 是否开启 https 服务
    cors: true, // 允许跨域
    proxy: {
      // 选项写法
      '/blog': {
        target: 'http://192.168.10.208:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog/, ''),
      },
    },
  },
  base: './',
  publicDir: 'public',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }, // 配置路径别名
    ],
  },
  build: {
    target: 'modules', // 浏览器兼容目标
    outDir: 'dist', // 打包输出路径
    assetsDir: 'assets', // 静态资源存放路径
    cssCodeSplit: true, // 允许 css 代码拆分
    sourcemap: false, // 不生成 sourceMap 文件
    minify: 'terser', // 缩小文件体积
    terserOptions: {
      compress: {
        drop_console: true, // 取消 console
        drop_debugger: true, // 取消 debugger
      },
    },
  },
});
