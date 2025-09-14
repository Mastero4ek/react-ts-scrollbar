import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
	const isDev = mode === 'development' || process.env.NODE_ENV === 'development'

	if (isDev) {
		return {
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
				outDir: '../../dist-demo',
				sourcemap: true,
			},
			root: 'src/dev',
			base: '/react-ts-scrollbar/',
		}
	} else {
		return {
			plugins: [react()],
			resolve: {
				alias: {
					'@': path.resolve(__dirname, './src'),
				},
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
		}
	}
})
