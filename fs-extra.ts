import { fs } from 'memfs';
import { extendWithFsExtraApi } from './index';

/**
 * 使用 fs-extra 風格 API 擴展 memfs 預設 fs
 * Extend memfs default fs with fs-extra style APIs
 *
 * @description 這是模組的主要匯出點，提供完整的 fs-extra 風格 API
 * This is the main export point of the module, providing complete fs-extra style APIs
 *
 * @example
 * ```typescript
 * import fse from 'memfs-extra/fs-extra';
 *
 * // 使用方式與 fs-extra 相同
 * // Usage is the same as fs-extra
 * await fse.mkdirs('/tmp/dir');
 * await fse.writeFile('/tmp/file.txt', 'content');
 * ```
 */
export = extendWithFsExtraApi(fs);
