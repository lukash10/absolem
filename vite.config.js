import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          title: 'Absolem Tabacaria',
          description: 'Absolem Tabacaria & Distribuidora',
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '~bootstrap': 'bootstrap'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3080/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
