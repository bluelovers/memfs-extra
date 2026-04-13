"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWithFsExtraApi = extendWithFsExtraApi;
exports._unSupportMethods = _unSupportMethods;
const path_1 = require("path");
function extendWithFsExtraApi(fs) {
    const fse = {
        ...fs,
        // path-exists
        pathExists: async (path) => {
            try {
                await fs.promises.access(path);
                return true;
            }
            catch {
                return false;
            }
        },
        pathExistsSync: (path) => {
            return fs.existsSync(path);
        },
        // mkdirs
        mkdirs: async (dir, options) => {
            return fs.promises.mkdir(dir, { recursive: true, ...options });
        },
        mkdirsSync: (dir, options) => {
            return fs.mkdirSync(dir, { recursive: true, ...options });
        },
        mkdirp: async (dir, options) => fse.mkdirs(dir, options),
        mkdirpSync: (dir, options) => fse.mkdirsSync(dir, options),
        ensureDir: async (dir, options) => fse.mkdirs(dir, options),
        ensureDirSync: (dir, options) => fse.mkdirsSync(dir, options),
        // remove
        remove: async (path) => {
            return fs.promises.rm(path, { recursive: true, force: true });
        },
        removeSync: (path) => {
            return fs.rmSync(path, { recursive: true, force: true });
        },
        // outputFile
        outputFile: async (file, data, options) => {
            const dir = (0, path_1.dirname)(file);
            if (!fse.pathExistsSync(dir)) {
                await fse.mkdirs(dir);
            }
            return fs.promises.writeFile(file, data, options);
        },
        outputFileSync: (file, data, options) => {
            const dir = (0, path_1.dirname)(file);
            if (!fse.pathExistsSync(dir)) {
                fse.mkdirsSync(dir);
            }
            return fs.writeFileSync(file, data, options);
        },
        // JSON
        readJson: async (file, options) => {
            const content = await fs.promises.readFile(file, options);
            return JSON.parse(content.toString());
        },
        readJsonSync: (file, options) => {
            const content = fs.readFileSync(file, options);
            return JSON.parse(content.toString());
        },
        writeJson: async (file, obj, options) => {
            const str = JSON.stringify(obj, null, options === null || options === void 0 ? void 0 : options.spaces);
            return fs.promises.writeFile(file, str, options);
        },
        writeJsonSync: (file, obj, options) => {
            const str = JSON.stringify(obj, null, options === null || options === void 0 ? void 0 : options.spaces);
            return fs.writeFileSync(file, str, options);
        },
        outputJson: async (file, obj, options) => {
            const dir = (0, path_1.dirname)(file);
            if (!fse.pathExistsSync(dir)) {
                await fse.mkdirs(dir);
            }
            return fse.writeJson(file, obj, options);
        },
        outputJsonSync: (file, obj, options) => {
            const dir = (0, path_1.dirname)(file);
            if (!fse.pathExistsSync(dir)) {
                fse.mkdirsSync(dir);
            }
            return fse.writeJsonSync(file, obj, options);
        },
        // emptyDir
        emptyDir: async (dir) => {
            let items;
            try {
                items = await fs.promises.readdir(dir);
            }
            catch {
                return fse.mkdirs(dir);
            }
            // Use simple join for path to be cross-platform compatible in memfs
            return Promise.all(items.map(item => fse.remove((0, path_1.join)(dir, item))));
        },
        emptyDirSync: (dir) => {
            let items;
            try {
                items = fs.readdirSync(dir);
            }
            catch {
                return fse.mkdirsSync(dir);
            }
            items.forEach(item => fse.removeSync((0, path_1.join)(dir, item)));
        },
        ensureLink: async (src, dest) => {
            if (fse.pathExistsSync(dest))
                return;
            await fse.mkdirs((0, path_1.dirname)(dest));
            return fs.promises.link(src, dest);
        },
        ensureLinkSync: (src, dest) => {
            if (fse.pathExistsSync(dest))
                return;
            fse.mkdirsSync((0, path_1.dirname)(dest));
            return fs.linkSync(src, dest);
        },
        ensureSymlink: async (src, dest, type) => {
            if (fse.pathExistsSync(dest))
                return;
            await fse.mkdirs((0, path_1.dirname)(dest));
            return fs.promises.symlink(src, dest, type);
        },
        ensureSymlinkSync: (src, dest, type) => {
            if (fse.pathExistsSync(dest))
                return;
            fse.mkdirsSync((0, path_1.dirname)(dest));
            return fs.symlinkSync(src, dest, type);
        },
        // move
        move: async (src, dest, options) => {
            if ((options === null || options === void 0 ? void 0 : options.overwrite) === false && fse.pathExistsSync(dest)) {
                if (options === null || options === void 0 ? void 0 : options.errorOnExist)
                    throw new Error('dest already exists.');
                return;
            }
            await fse.mkdirs((0, path_1.dirname)(dest));
            return fs.promises.rename(src, dest);
        },
        moveSync: (src, dest, options) => {
            if ((options === null || options === void 0 ? void 0 : options.overwrite) === false && fse.pathExistsSync(dest)) {
                if (options === null || options === void 0 ? void 0 : options.errorOnExist)
                    throw new Error('dest already exists.');
                return;
            }
            fse.mkdirsSync((0, path_1.dirname)(dest));
            return fs.renameSync(src, dest);
        },
        // copy
        copy: async (src, dest, options) => {
            const stat = await fs.promises.stat(src);
            if (stat.isDirectory()) {
                if (!fse.pathExistsSync(dest)) {
                    await fse.mkdirs(dest);
                }
                const items = await fs.promises.readdir(src);
                await Promise.all(items.map(item => fse.copy((0, path_1.join)(src, item), (0, path_1.join)(dest, item), options)));
            }
            else {
                await fse.mkdirs((0, path_1.dirname)(dest));
                await fs.promises.copyFile(src, dest, (options === null || options === void 0 ? void 0 : options.overwrite) === false ? fs.constants.COPYFILE_EXCL : 0);
            }
        },
        copySync: (src, dest, options) => {
            const stat = fs.statSync(src);
            if (stat.isDirectory()) {
                if (!fse.pathExistsSync(dest)) {
                    fse.mkdirsSync(dest);
                }
                const items = fs.readdirSync(src);
                items.forEach(item => fse.copySync((0, path_1.join)(src, item), (0, path_1.join)(dest, item), options));
            }
            else {
                fse.mkdirsSync((0, path_1.dirname)(dest));
                fs.copyFileSync(src, dest, (options === null || options === void 0 ? void 0 : options.overwrite) === false ? fs.constants.COPYFILE_EXCL : 0);
            }
        },
        // cpSync
        cpSync: (src, dest, options) => {
            if (typeof fs.cpSync === 'function') {
                return fs.cpSync(src, dest, options);
            }
            return fse.copySync(src, dest, options);
        },
        // mkdtempDisposableSync
        mkdtempDisposableSync: ((prefix, options) => {
            const path = fs.mkdtempSync(prefix, options);
            const disposable = {
                path,
                [Symbol.dispose || Symbol.for('Symbol.dispose')]: () => {
                    fse.removeSync(path);
                },
                dispose: () => {
                    fse.removeSync(path);
                },
            };
            return disposable;
        }),
        // statfsSync
        statfsSync: (path, options) => {
            if (typeof fs.statfsSync === 'function') {
                return fs.statfsSync(path, options);
            }
            // basic mock for memfs which might not have statfs
            return {
                type: 0,
                bsize: 4096,
                blocks: 0,
                bfree: 0,
                bavail: 0,
                files: 0,
                ffree: 0,
            };
        },
        // ensureFile
        ensureFile: async (file) => {
            if (fse.pathExistsSync(file))
                return;
            await fse.mkdirs((0, path_1.dirname)(file));
            return fs.promises.writeFile(file, '');
        },
        ensureFileSync: (file) => {
            if (fse.pathExistsSync(file))
                return;
            fse.mkdirsSync((0, path_1.dirname)(file));
            return fs.writeFileSync(file, '');
        },
        createFile: async (file) => fse.ensureFile(file),
        createFileSync: (file) => fse.ensureFileSync(file),
        // aliases
        createLink: async (src, dest) => fse.ensureLink(src, dest),
        createLinkSync: (src, dest) => fse.ensureLinkSync(src, dest),
        createSymlink: async (src, dest, type) => fse.ensureSymlink(src, dest, type),
        createSymlinkSync: (src, dest, type) => fse.ensureSymlinkSync(src, dest, type),
        emptydir: async (dir) => fse.emptyDir(dir),
        emptydirSync: (dir) => fse.emptyDirSync(dir),
    };
    fse.readJSON = fse.readJson;
    fse.readJSONSync = fse.readJsonSync;
    fse.writeJSON = fse.writeJson;
    fse.writeJSONSync = fse.writeJsonSync;
    fse.outputJSON = fse.outputJson;
    fse.outputJSONSync = fse.outputJsonSync;
    return fse;
}
function _unSupportMethods() {
    return [
        'FileReadStream',
        'FileWriteStream',
        'Utf8Stream',
        'Dir',
        'gracefulify',
    ];
}
exports.default = extendWithFsExtraApi;
//# sourceMappingURL=index.js.map