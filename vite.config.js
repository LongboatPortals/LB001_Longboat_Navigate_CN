import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://app.longboat.com/',
    },
    open: true,
    port: 8080
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      strictMessage: false,
      escapeHtml: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**') // provide a path to the folder where you'll store translation data (see below)
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      //extensions: ['.mjs', '.d', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
          @use "sass:color";
          @import "@/assets/styles/settings.scss";
        `
      }
    }
  },

})
