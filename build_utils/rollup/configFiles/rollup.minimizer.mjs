import terser from '@rollup/plugin-terser';

import { ENVS } from '../../config/index.mjs';

const isProd = process.env.LIB_ENV === ENVS.PROD;

/**
 * @returns {import('rollup').RollupOptions}
 */
const config = {
  plugins: [
    terser({
      compress: {
        dead_code: true,
        drop_debugger: isProd,
        drop_console: false,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        keep_fargs: false,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        side_effects: true,
      },
      mangle: true,
    }),
  ],
};

export default config;
