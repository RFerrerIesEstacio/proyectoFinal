import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: {
      // Internal port (in container same as sveltekit port).
      clientPort: 80,
      host: 'localhost',
    },
    watch: {
      usePolling: true
    }
  },
  
})
