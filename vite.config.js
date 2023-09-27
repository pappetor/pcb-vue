import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve:{
  },
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:9999/",
        secure: false,
        changeOrigin: true, //this one is declare for cross
        rewrite: (path) => {console.log(path); return path.replace(/^\/api/, '')}
      }
    }
  }
})
