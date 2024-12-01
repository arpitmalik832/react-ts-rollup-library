import { entryPath } from './build_utils/config/commonPaths.mjs';

const config = {
  entry: [entryPath],
  project: ['{src,public}/**/*.{mjs,cjs,js,ts,jsx,css,scss,json,md,mdx}'],
};

export default config;
