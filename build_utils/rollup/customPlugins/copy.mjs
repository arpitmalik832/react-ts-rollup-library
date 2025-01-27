import copy from 'rollup-plugin-copy';

/**
 * @returns {import('rollup').InputPluginOption}
 */
const config = () =>
  copy({
    targets: [
      {
        src: 'static/styles/*',
        dest: 'dist/styles',
      },
      {
        src: 'src/styles/mixins/*',
        dest: 'dist/styles/mixins',
      },
      {
        src: 'static/enums/icons_list.mjs',
        dest: 'dist',
      },
    ],
  });

export default config;
