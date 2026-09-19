import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'tslider.js' : 'tslider.cjs'),
      cssFileName: 'style',
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
