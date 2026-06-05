import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Built output is consumed by TMind V2's `usa-trucking-leads.aspx` page,
// which references the JS/CSS chunks under /usa-leads/assets/. (We can't
// mount under /landing/ — that path is already an IIS Application pointing
// at D:\Development\TMind Landing for a legacy site.)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/usa-leads/',
  build: {
    outDir: path.resolve(__dirname, '../../../TMind V2/TMind/usa-leads'),
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
