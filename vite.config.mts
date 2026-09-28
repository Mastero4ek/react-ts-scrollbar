import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Vite is only used for the demo app (library builds via tsc).
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: 'dist-demo',
		sourcemap: true,
	},
	root: 'src/dev',
	base: '/react-ts-scrollbar/',
})
