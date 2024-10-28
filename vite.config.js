import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.21.3:8080', // API 서버 주소
        // changeOrigin: true,
        secure: false,
        wss: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 필요에 따라 경로 재작성
      },
    },
  },
});

console.log('Vite config loaded with proxy settings:'); // Vite 설정 로그
console.log('Proxy settings:', {
  '/api': {
    target: 'http://192.168.21.3:8080',
    changeOrigin: true,
  },
});