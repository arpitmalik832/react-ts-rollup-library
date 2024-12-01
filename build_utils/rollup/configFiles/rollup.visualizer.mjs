import { visualizer } from 'rollup-plugin-visualizer';

import { BUILD_TYPE } from '../../config/index.mjs';
import { distInfoPath } from '../../config/commonPaths.mjs';

/**
 * @returns {import('rollup').RollupOptions}
 */
const getConfig = type => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const path = `${distInfoPath}/${type === BUILD_TYPE.SVGR ? BUILD_TYPE.SVGR : BUILD_TYPE.MAIN}/${process.env.LIB_ENV}/visualizers/${timestamp}`;

  return {
    plugins: [
      visualizer({
        filename: `${path}/flamegraph.html`,
        template: 'flamegraph',
      }),
      visualizer({
        filename: `${path}/list.html`,
        template: 'list',
      }),
      visualizer({
        filename: `${path}/network.html`,
        template: 'network',
      }),
      visualizer({
        filename: `${path}/raw-data.html`,
        template: 'raw-data',
      }),
      visualizer({
        filename: `${path}/sunburst.html`,
        template: 'sunburst',
      }),
      visualizer({
        filename: `${path}/treemap.html`,
        template: 'treemap',
      }),
    ],
  };
};

export default getConfig;
