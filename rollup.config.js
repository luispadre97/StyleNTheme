import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

export default [
    {
      input: `src/lapg.ts`,
      plugins: [esbuild()],
      output: [
        {
          file: `dist/bundle.js`,
          format: 'cjs',
          sourcemap: true,
          exports: 'default',
        },
      ]
    },
    {
        input: `src/lapg.ts`,
      plugins: [dts()],
      output: {
        file: `dist/bundle.d.ts`,
        format: 'es',
      },
    }
  ]
  