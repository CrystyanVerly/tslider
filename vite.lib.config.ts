import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es', 'cjs'],
			fileName: (format) => (format === 'es' ? 'tslider.js' : 'tslider.cjs'),
			cssFileName: 'style',
		},
	},
	plugins: [
		dts({
			exclude: ['src/main.ts'],
		}),
	],
});
