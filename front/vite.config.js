import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3006, // usa el puerto de Render o 3006 local
    host: '0.0.0.0', // importante para Render
    open: true,
  }
})
