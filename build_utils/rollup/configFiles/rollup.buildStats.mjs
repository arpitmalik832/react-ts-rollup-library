import { distInfoPath } from '../../config/commonPaths.mjs';
import { BUILD_TYPE } from '../../config/index.mjs';
import buildStats from '../customPlugins/buildStats.mjs';

/**
 * @returns {import('rollup').RollupOptions}
 */
const getConfig = type => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `${distInfoPath}/${type === BUILD_TYPE.SVGR ? BUILD_TYPE.SVGR : BUILD_TYPE.MAIN}/${process.env.LIB_ENV}/buildStats`;

  return {
    plugins: [buildStats(`${path}/${timestamp}.json`)],
  };
};

export default getConfig;
