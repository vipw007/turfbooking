import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  preview: {
    port: parseInt(process.env.PORT || '8080'),
    host: '0.0.0.0',
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
