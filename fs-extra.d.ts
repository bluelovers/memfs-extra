declare const _default: import("memfs").IFs & Omit<typeof import("fs-extra"), "FileReadStream" | "FileWriteStream" | "Utf8Stream" | "Dir" | "gracefulify"> & import("./index").IFakeFsHasVol & {
    fs: import("./index").IFakeFsExtraCore;
};
export = _default;
