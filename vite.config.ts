/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MonacoPluginEmmet',
      formats: ['es', 'umd', 'iife'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['monaco-editor'],
      output: {
        globals: {
          'monaco-editor': 'monaco'
        }
      }
    }
  },
  test: {
    alias: [
      {
        find: /^monaco-editor$/,
        replacement:
          __dirname + '/node_modules/monaco-editor/esm/vs/editor/editor.api'
      }
    ],
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: 'test/config.ts'
  }
})
