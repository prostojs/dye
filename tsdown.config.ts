import { defineConfig } from 'tsdown'

export default defineConfig([
    {
        entry: ['src/index.ts'],
        format: ['esm', 'cjs'],
        dts: true,
    },
    {
        entry: [
            'src/plugins/rolldown.ts',
            'src/plugins/vite.ts',
            'src/plugins/update-configs.ts',
            'src/plugins/common.ts',
        ],
        format: ['esm'],
        outDir: 'dist/plugins',
        dts: true,
        deps: { neverBundle: ['@prostojs/dye', 'rolldown', 'vite'] },
    },
])
