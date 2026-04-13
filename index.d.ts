import { IFs, Volume } from 'memfs';
export type { PathOrFileDescriptor as IPathOrFileDescriptor } from 'fs';
/**
 * fs-extra 風格的檔案系統 API 型別
 * File system API type in fs-extra style
 *
 * @description 擴展 memfs 以提供 fs-extra 風格的 API，包含路徑檢查、目錄操作、檔案操作等功能
 * Extends memfs to provide fs-extra style APIs for path checking, directory operations, file operations, etc.
 */
export type IFakeFsExtra = Omit<typeof import('fs-extra'), 'FileReadStream' | 'FileWriteStream' | 'Utf8Stream' | 'Dir' | 'gracefulify'>;
/**
 * 使用 fs-extra 風格 API 擴展 memfs Volume 實例
 * Extend memfs Volume with fs-extra style APIs
 *
 * @param vol - 要擴展的 Volume 實例（由 memfs 匯出 或 new Volume() 建立）/ Volume instance to extend
 * @returns 擴展後的檔案系統 API / Extended file system APIs
 *
 * @example
 * ```typescript
 * import { vol } from 'memfs';
 * import { extendWithFsExtraApiFromVolume } from 'memfs-extra';
 *
 * // vol 是 memfs 匯出的預設 Volume 實例
 * // vol is memfs exported default Volume instance
 * const fse = extendWithFsExtraApiFromVolume(vol);
 * await fse.mkdirs('/tmp/dir');
 * await fse.writeFile('/tmp/file.txt', 'content');
 * ```
 *
 * @see extendWithFsExtraApi - 如果使用 memfs 匯出的 fs，使用此函式
 */
export declare function extendWithFsExtraApiFromVolume<T extends Volume>(vol: T): IFs & IFakeFsExtra;
/**
 * 使用 fs-extra 風格 API 擴展 memfs
 * Extend memfs with fs-extra style APIs
 *
 * @param fs - 要擴展的 memfs 檔案系統實例（由 memfs 匯出）/ memfs filesystem instance (exported from memfs)
 * @returns 擴展後的檔案系統 API / Extended file system APIs
 *
 * @example
 * ```typescript
 * import { fs } from 'memfs';
 * import { extendWithFsExtraApi } from 'memfs-extra';
 *
 * // 傳入 memfs 匯出的 fs 物件
 * // Pass memfs exported fs object
 * const fse = extendWithFsExtraApi(fs);
 * await fse.mkdirs('/tmp/dir');
 * await fse.writeFile('/tmp/file.txt', 'content');
 * ```
 *
 * @see extendWithFsExtraApiFromVolume - 如果使用 new Volume()，使用此函式
 */
export declare function extendWithFsExtraApi<T extends IFs>(fs: T): T & IFakeFsExtra;
/**
 * 從擴展後的 fs 實例取得底層 Volume
 * Get underlying Volume from extended fs instance
 *
 * @param fs - 擴展後的檔案系統實例 / Extended filesystem instance
 * @returns 底層的 Volume 實例 / Underlying Volume instance
 *
 * @example
 * ```typescript
 * import { fs } from 'memfs';
 * import { extendWithFsExtraApi, getVolumeFromFs } from 'memfs-extra';
 *
 * // 擴展 fs
 * const fse = extendWithFsExtraApi(fs);
 *
 * // 執行一些操作
 * await fse.writeFile('/test.txt', 'Hello');
 *
 * // 取得底層 Volume
 * const originalVol = getVolumeFromFs(fse);
 *
 * // 可以用於：儲存/還原狀態、複製fs、取得原始資料等
 * // Use for: save/restore state, clone fs, get raw data, etc.
 * const data = originalVol.toJSON();
 * console.log(data); // { "/test.txt": <Buffer> }
 * ```
 *
 * @internal
 */
export declare function getVolumeFromFs(fs: IFs): Volume;
/**
 * 取得不支援的方法清單
 * Get list of unsupported methods
 *
 * @returns 不支援的 fs-extra 方法名稱陣列 / Array of unsupported fs-extra method names
 *
 * @description 這些方法在 memfs 中無法實現或是因為瀏覽器環境限制
 * These methods cannot be implemented in memfs due to browser environment limitations
 */
export declare function _unSupportMethods(): readonly ["FileReadStream", "FileWriteStream", "Utf8Stream", "Dir", "gracefulify"];
export default extendWithFsExtraApi;
