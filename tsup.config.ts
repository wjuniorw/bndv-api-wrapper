import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Gera tanto para require() quanto para import
  dts: true, // Gera os arquivos de tipagem (.d.ts) para o autocomplete funcionar
  splitting: false,
  sourcemap: true,
  clean: true, // Limpa a pasta dist antes de cada build
  minify: true, // Deixa o pacote mais leve para quem baixar
})
