import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
      /* other options */
    },
    manifest: {
      name: 'Opal',
      short_name: 'Opal',
      background_color: "#000000",
      theme_color: "#000000",
      display: "standalone",
      icons: [
        {
          src: 'opal.png',
          sizes: '500x500',
          type: 'image/png'
        }
      ]
    }
  })]
})
