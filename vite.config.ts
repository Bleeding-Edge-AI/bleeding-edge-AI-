import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This creates the "Bridge" to pass the key to your client code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
