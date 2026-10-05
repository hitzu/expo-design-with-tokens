import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración mínima: sin variables de entorno, sin plugins extra.
export default defineConfig({
  plugins: [react()],
});
