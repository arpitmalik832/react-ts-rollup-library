/* eslint-disable no-param-reassign */
import { ENVS } from '../../config/index.mjs';

/**
 * @returns {import('rollup').InputPluginOption}
 */
const importStyles = () => ({
  name: 'import-styles-plugin',
  generateBundle(options, bundle) {
    const importPath = '../index.css';
    Object.entries(bundle).forEach(([fileName, fileMeta]) => {
      if (fileName === 'esm/lib.js') {
        fileMeta.code = `import "${importPath}";${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
      } else if (fileName === 'cjs/lib.js') {
        fileMeta.code = `require("${importPath}");${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
      }
    });
  },
});

export default importStyles;
