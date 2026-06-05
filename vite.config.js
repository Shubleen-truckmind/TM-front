import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Built output is consumed by TMind V2's `usa-trucking-leads.aspx` page,
// which references the hashed JS/CSS chunks under /landing/assets/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/landing/',
  build: {
    outDir: path.resolve(__dirname, '../../../TMind V2/TMind/landing'),
    emptyOutDir: true,
    // Emit stable (non-hashed) filenames so usa-trucking-leads.aspx can link
    // /landing/assets/index.js + /landing/assets/index.css without server-side
    // hash resolution. Cache-busting is handled by no-cache meta tags on the
    // .aspx shell, identical to how /onboard/ is served.
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) return 'assets/index.css';
          return 'assets/[name][extname]';
        },
      },
    },
  },
})
