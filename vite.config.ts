import react from '@vitejs/plugin-react';
import { visualizer as analyzer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(async ({ mode }) => {
  return {
    build: {
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      minify: true,
      rollupOptions: {
        plugins: [
          mode === 'analyze'
            ? analyzer({
                brotliSize: true,
                filename: 'dist/stats.html',
                gzipSize: true,
                open: true,
              })
            : null,
        ],
      },
      target: 'chrome110',
    },
    plugins: [
      react(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
    ],
  };
});
