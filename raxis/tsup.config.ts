import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: false,
	clean: true,
	dts: true,
	minify: 'terser',
	format: ['esm', 'cjs'],
	sourcemap: true,
	target: ['chrome100', 'firefox100', 'node20', 'deno1.39'],
	platform: 'neutral',
	minifyIdentifiers: false,
	keepNames: true,
	outDir: 'dist',
});
