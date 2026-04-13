"use strict";
const tslib_1 = require("tslib");
const index_1 = require("./index");
const memfs_1 = require("memfs");
const fs_1 = tslib_1.__importDefault(require("fs"));
const unionfs_1 = require("unionfs");
/**
 * 建立 unionfs 實例，將 memfs 與實際檔案系統結合
 * Create unionfs instance combining memfs and real file system
 *
 * @description 使用 unionfs 實現記憶體檔案系統優先存取
 * Uses unionfs to implement in-memory file system priority access
 *
 * @example
 * ```typescript
 * import ufs from 'memfs-extra/unionfs';
 *
 * // 讀取時先查詢 memfs，再查詢實際檔案系統
 * // When reading, first check memfs, then check real file system
 * const content = await ufs.readFile('/test.txt');
 * ```
 */
const ufs = new unionfs_1.Union()
    .use(memfs_1.fs)
    .use(fs_1.default);
module.exports = (0, index_1.extendWithFsExtraApiFromUnionfs)(ufs);
//# sourceMappingURL=unionfs.js.map