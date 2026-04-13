import { IFs } from 'memfs';
export type { PathOrFileDescriptor as IPathOrFileDescriptor } from 'fs';
export type IFakeFsExtra = Omit<typeof import('fs-extra'), 'FileReadStream' | 'FileWriteStream' | 'Utf8Stream' | 'Dir' | 'gracefulify'>;
export declare function extendWithFsExtraApi<T extends IFs>(fs: T): T & IFakeFsExtra;
export declare function _unSupportMethods(): string[];
export default extendWithFsExtraApi;
