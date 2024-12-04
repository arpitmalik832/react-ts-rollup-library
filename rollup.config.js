import mainConfig from './build_utils/rollup/configFiles/rollup.main.mjs';
import svgrConfig from './build_utils/rollup/configFiles/rollup.svgr.mjs';
import dtsConfig from './build_utils/rollup/configFiles/rollup.dts.mjs';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [mainConfig(), svgrConfig(), dtsConfig];

export default config;
