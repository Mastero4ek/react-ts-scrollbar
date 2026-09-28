import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Standalone vitest config (do not reuse demo vite root: src/dev).
// Vite 8 + Vitest 4 share the same vite; JSX via oxc automatic runtime.
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./test/setup.ts'],
		include: ['test/**/*.{test,spec}.{ts,tsx}'],
		css: false,
	},
})
