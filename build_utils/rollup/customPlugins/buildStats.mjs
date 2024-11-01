import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import zlib from 'zlib';

/**
 * @returns {import('rollup').InputPluginOption}
 */
export default function buildStats(outputPath = 'build-stats.json') {
  let startTime;

  return {
    name: 'build-stats-plugin',
    buildStart() {
      startTime = Date.now();
    },
    generateBundle(options, bundle) {
      const stats = {
        files: [],
        totalSize: 0,
        totalGzippedSize: 0,
        totalBrotliSize: 0,
        buildDuration: Date.now() - startTime,
        noOfFiles: 0,
        largestFile: null,
      };

      Object.entries(bundle).forEach(([fileName, fileMeta]) => {
        if (!fileName.endsWith('.map')) {
          let content = '';

          if (fileMeta.code) {
            content = fileMeta.code;
          } else if (fileMeta.source) {
            content = fileMeta.source;
          } else if (typeof fileMeta === 'string') {
            content = fileMeta;
          }

          const size = Buffer.byteLength(content, 'utf8');
          const gzippedSize = zlib.gzipSync(content).length;
          const brotliSize = zlib.brotliCompressSync(content).length;

          stats.files.push({
            fileName,
            size,
            gzippedSize,
            brotliSize,
            contentType: fileMeta.type || 'unknown',
          });

          stats.totalSize += size;
          stats.totalGzippedSize += gzippedSize;
          stats.totalBrotliSize += brotliSize;
        }
      });

      stats.noOfFiles = stats.files.length;

      if (stats.files.length > 0) {
        stats.files = stats.files.map(i => ({
          ...i,
          percentageBySize: ((i.size / stats.totalSize) * 100).toFixed(2),
        }));
        stats.largestFile = stats.files.reduce(
          (prev, current) => (prev.size > current.size ? prev : current),
          stats.files[0],
        );
      }

      // Ensure the directory exists
      mkdirSync(dirname(outputPath), { recursive: true });

      writeFileSync(outputPath, JSON.stringify(stats, null, 2));
    },
  };
}
