import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3006,
    host: '0.0.0.0',
    open: true,
    allowedHosts: ['webtrabajo-1.onrender.com'] // 👈 agrega tu dominio de Render
  }
})
