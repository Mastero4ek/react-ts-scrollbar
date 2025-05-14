import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/dev/styles/variables.scss";`,
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, 'src/index.ts'),
			},
		},
	},
	root: process.env.NODE_ENV === 'development' ? 'src/dev' : '.',
})
