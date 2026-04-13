import { IFs, Volume } from 'memfs';
import { FsSynchronousApi } from '@jsonjoy.com/fs-node-utils/lib/types/FsSynchronousApi';
export type { PathOrFileDescriptor as IPathOrFileDescriptor } from 'fs';
/**
 * 核心的 fs-extra 風格檔案系統 API
 * Core fs-extra style file system API
 *
 * @description 擴展 memfs 以提供 fs-extra 風格的 API，包含路徑檢查、目錄操作、檔案操作等功能
 * Extends memfs to provide fs-extra style APIs for path checking, directory operations, file operations, etc.
 */
export type IFakeFsExtraCore = Omit<typeof import('fs-extra'), 'FileReadStream' | 'FileWriteStream' | 'Utf8Stream' | 'Dir' | 'gracefulify'> & IFakeFsHasVol;
/**
 * 包含 Volume 實例的檔案系統介面
 * File system interface with Volume instance
 *
 * @description 用於存取底層的 memfs Volume 實例
 * Used to access the underlying memfs Volume instance
 */
export type IFakeFsHasVol = {
    /** 底層的 Volume 實例 / Underlying Volume instance */
    readonly __vol: Volume;
};
/**
 * 擴展後的檔案系統 API（包含原始 fs 作為屬性）
 * Extended file system API (includes original fs as property)
 *
 * @description 同時提供 fs-extra 風格 API 與原始 memfs API
 * Provides both fs-extra style APIs and original memfs APIs
 */
export type IFakeFsExtra = IFakeFsExtraCore & {
    /** 擴展後的檔案系統 API / Extended file system API */
    readonly fs: IFakeFsExtraCore;
};
/**
 * 完整的 memfs-extra 檔案系統類型
 * Complete memfs-extra file system type
 *
 * @description 泛型參數 T 預設為 IFs，可自訂底層檔案系統類型
 * Generic parameter T defaults to IFs, customizable underlying file system type
 *
 * @param T - 底層檔案系統類型 / Underlying file system type
 */
export type IMemFsExtra<T extends IFs = IFs> = T & IFakeFsExtra;
/**
 * memfs-extra 擴展選項
 * memfs-extra extension options
 *
 * @description 自訂如何取得 Volume 與底層 fs 實例
 * Customize how to get Volume and underlying fs instance
 */
export interface IOptionMemFsExtra {
    /** 自訂取得 Volume 的函式 / Custom function to get Volume */
    getVolume?(): Volume | undefined;
    /** 自訂取得底層 fs 的函式 / Custom function to get underlying fs */
    getFs?(): IFs | undefined;
}
/**
 * 使用 fs-extra 風格 API 擴展 memfs Volume 實例
 * Extend memfs Volume with fs-extra style APIs
 *
 * @param vol - 要擴展的 Volume 實例（由 memfs 匯出 或 new Volume() 建立）/ Volume instance to extend
 * @param opts - 擴展選項 / Extend options
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
export declare function extendWithFsExtraApiFromVolume<T extends Volume>(vol: T, opts?: IOptionMemFsExtra): IMemFsExtra<IFs>;
/**
 * 使用 fs-extra 風格 API 擴展 memfs
 * Extend memfs with fs-extra style APIs
 *
 * @param fs - 要擴展的 memfs 檔案系統實例（由 memfs 匯出）/ memfs filesystem instance (exported from memfs)
 * @param opts - 擴展選項 / Extend options
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
 * @see extendWithFsExtraApiFromUnionfs - 如果使用 unionfs，使用此函式
 */
export declare function extendWithFsExtraApi<T extends IFs>(fs: T | FsSynchronousApi | IFakeUnionfsLike, opts?: IOptionMemFsExtra): IMemFsExtra<T>;
/**
 * 從擴展後的 fs 實例取得底層 Volume
 * Get underlying Volume from extended fs instance
 *
 * @param fs - 擴展後的檔案系統實例 / Extended filesystem instance
 * @param notThrow
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
 * @internal 來自官方原始碼
 */
export declare function getVolumeFromFs(fs: IFs | unknown | IFakeFsHasVol, notThrow?: boolean): Volume;
/**
 * 從 unionfs 實例中找到 memfs Volume
 * Find memfs Volume from unionfs instance
 *
 * @param fs - unionfs 實例 / unionfs instance
 * @param fromRight - 是否從右側開始搜尋 / Whether to search from right side
 * @returns 找到的 memfs 與 Volume 資訊 / Found memfs and Volume information
 *
 * @description 在 unionfs 的 fss 陣列中搜尋第一個 memfs Volume
 * Searches for the first memfs Volume in unionfs's fss array
 */
export declare function _unionfsFindMemFs<T extends IFakeUnionfsLike>(fs: T, fromRight?: boolean): {
    memfs: IFs;
    vol: Volume;
    index: number;
};
/**
 * unionfs 相似介面
 * unionfs-like interface
 *
 * @description 用於識別類似 unionfs 的檔案系統
 * Used to identify unionfs-like file systems
 */
export interface IFakeUnionfsLike {
    /** 新增一個檔案系統到 unionfs / Add a file system to unionfs */
    use(fs: any): any;
    /** 同步檢查路徑是否存在 / Synchronously check if path exists */
    existsSync(path: any): boolean;
}
/**
 * @todo FIXME: https://github.com/streamich/unionfs/issues/810
 */
export declare function extendWithFsExtraApiFromUnionfs<T extends IFakeUnionfsLike>(ufs: T, opts?: IOptionMemFsExtra): IMemFsExtra<IFs>;
/**
 * 取得不支援的方法清單
 * Get list of unsupported methods
 *
 * @returns 不支援的 fs-extra 方法名稱陣列 / Array of unsupported fs-extra method names
 *
 * @description 這些方法在 memfs 中無法實現或是因為瀏覽器環境限制
 * These methods cannot be implemented in memfs due to browser environment limitations
 */
export declare function _getUnsupportMethods(): readonly ['FileReadStream', 'FileWriteStream', 'Utf8Stream', 'Dir', 'gracefulify'];
export default extendWithFsExtraApi;
