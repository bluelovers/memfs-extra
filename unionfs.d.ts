/**
 * 使用 fs-extra 風格 API 擴展 memfs 與 unionfs
 * Extend unionfs with fs-extra style APIs
 *
 * @description 結合 unionfs 與 fs-extra API，提供統一的 API 介面
 * Combines unionfs with fs-extra APIs to provide unified API interface
 */
declare const _default: import("./index").IMemFsExtra<import("memfs").IFs>;
export = _default;
