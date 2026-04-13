import { IFs, createFsFromVolume, Volume } from 'memfs';
import { dirname, join } from 'path';
import { mkdtempDisposableSync } from 'fs';
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
export function extendWithFsExtraApiFromVolume<T extends Volume>(vol: T)
{
	return extendWithFsExtraApi(createFsFromVolume(vol))
}

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
export function extendWithFsExtraApi<T extends IFs>(fs: T): T & IFakeFsExtra
{
	const fse = {
		...fs,

		// ==================== Path Exists / 路徑存在檢查 ====================
		/** 檢查路徑是否存在（非同步）/ Check if path exists (async) */
		pathExists: async (path: string) =>
		{
			try
			{
				await fs.promises.access(path);
				return true;
			}
			catch
			{
				return false;
			}
		},
		pathExistsSync: (path: string) =>
		{
			return fs.existsSync(path);
		},

		// ==================== Mkdirs / 目錄創建 ====================
		/** 遞迴創建目錄（非同步）/ Create directory recursively (async) */
		mkdirs: async (dir: any, options?: any) =>
		{
			return fs.promises.mkdir(dir, { recursive: true, ...options }) as any;
		},
		mkdirsSync: (dir: string, options?: any) =>
		{
			return fs.mkdirSync(dir, { recursive: true, ...options });
		},
		mkdirp: async (dir: string, options?: any) => fse.mkdirs(dir, options),
		mkdirpSync: (dir: string, options?: any) => fse.mkdirsSync(dir, options),
		ensureDir: async (dir: string, options?: any) => fse.mkdirs(dir, options),
		ensureDirSync: (dir: string, options?: any) => fse.mkdirsSync(dir, options),

		// ==================== Remove / 移除 ====================
		/** 遞迴移除檔案或目錄（非同步）/ Recursively remove file or directory (async) */
		remove: async (path: string) =>
		{
			return fs.promises.rm(path, { recursive: true, force: true });
		},
		removeSync: (path: string) =>
		{
			return fs.rmSync(path, { recursive: true, force: true });
		},

		// ==================== Output File / 輸出檔案 ====================
		/** 寫入檔案並自動創建父目錄（非同步）/ Write file and auto-create parent directories (async) */
		outputFile: async (file: string, data: any, options?: any) =>
		{
			const dir = dirname(file);
			if (!fse.pathExistsSync(dir))
			{
				await fse.mkdirs(dir);
			}
			return fs.promises.writeFile(file, data, options);
		},
		outputFileSync: (file: string, data: any, options?: any) =>
		{
			const dir = dirname(file);
			if (!fse.pathExistsSync(dir))
			{
				fse.mkdirsSync(dir);
			}
			return fs.writeFileSync(file, data, options);
		},

		// ==================== JSON / JSON 處理 ====================
		/** 讀取並解析 JSON 檔案（非同步）/ Read and parse JSON file (async) */
		readJson: async (file: any, options?: any) =>
		{
			const content = await fs.promises.readFile(file, options);
			return JSON.parse(content.toString());
		},
		readJsonSync: (file: any, options?: any) =>
		{
			const content = fs.readFileSync(file, options);
			return JSON.parse(content.toString());
		},
		writeJson: async (file: any, obj: any, options?: any) =>
		{
			const str = JSON.stringify(obj, null, options?.spaces);
			return fs.promises.writeFile(file, str, options);
		},
		writeJsonSync: (file: any, obj: any, options?: any) =>
		{
			const str = JSON.stringify(obj, null, options?.spaces);
			return fs.writeFileSync(file, str, options);
		},
		outputJson: async (file: string, obj: any, options?: any) =>
		{
			const dir = dirname(file);
			if (!fse.pathExistsSync(dir))
			{
				await fse.mkdirs(dir);
			}
			return fse.writeJson(file, obj, options);
		},
		outputJsonSync: (file: string, obj: any, options?: any) =>
		{
			const dir = dirname(file);
			if (!fse.pathExistsSync(dir))
			{
				fse.mkdirsSync(dir);
			}
			return fse.writeJsonSync(file, obj, options);
		},

		// ==================== Empty Dir / 清空目錄 ====================
		/** 清空目錄內容但保留目錄本身（非同步）/ Empty directory contents but keep directory (async) */
		emptyDir: async (dir: string) =>
		{
			let items;
			try
			{
				items = await fs.promises.readdir(dir);
			}
			catch
			{
				return fse.mkdirs(dir);
			}
			// Use simple join for path to be cross-platform compatible in memfs
			return Promise.all(items.map(item => fse.remove(join(dir, item))));
		},
		emptyDirSync: (dir: string) =>
		{
			let items;
			try
			{
				items = fs.readdirSync(dir);
			}
			catch
			{
				return fse.mkdirsSync(dir);
			}
			items.forEach(item => fse.removeSync(join(dir, item)));
		},

		// ==================== Ensure Link / 確保連結 ====================
		/** 確保硬連結存在（非同步）/ Ensure hard link exists (async) */
		ensureLink: async (src: string, dest: string) =>
		{
			if (fse.pathExistsSync(dest)) return;
			await fse.mkdirs(dirname(dest));
			return fs.promises.link(src, dest);
		},
		ensureLinkSync: (src: string, dest: string) =>
		{
			if (fse.pathExistsSync(dest)) return;
			fse.mkdirsSync(dirname(dest));
			return fs.linkSync(src, dest);
		},

		// ==================== Ensure Symlink / 確保符號連結 ====================
		/** 確保符號連結存在（非同步）/ Ensure symbolic link exists (async) */
		ensureSymlink: async (src: string, dest: string, type?: any) =>
		{
			if (fse.pathExistsSync(dest)) return;
			await fse.mkdirs(dirname(dest));
			return fs.promises.symlink(src, dest, type);
		},
		ensureSymlinkSync: (src: string, dest: string, type?: any) =>
		{
			if (fse.pathExistsSync(dest)) return;
			fse.mkdirsSync(dirname(dest));
			return fs.symlinkSync(src, dest, type);
		},

		// ==================== Move / 移動 ====================
		/** 移動或重新命名檔案/目錄（非同步）/ Move or rename file/directory (async) */
		move: async (src: string, dest: string, options?: any) =>
		{
			if (options?.overwrite === false && fse.pathExistsSync(dest))
			{
				if (options?.errorOnExist) throw new Error('dest already exists.');
				return;
			}
			await fse.mkdirs(dirname(dest));
			return fs.promises.rename(src, dest);
		},
		moveSync: (src: string, dest: string, options?: any) =>
		{
			if (options?.overwrite === false && fse.pathExistsSync(dest))
			{
				if (options?.errorOnExist) throw new Error('dest already exists.');
				return;
			}
			fse.mkdirsSync(dirname(dest));
			return fs.renameSync(src, dest);
		},

		// ==================== Copy / 複製 ====================
		/** 複製檔案或目錄（非同步）/ Copy file or directory (async) */
		copy: async (src: string, dest: string, options?: any) =>
		{
			const stat = await fs.promises.stat(src);
			if (stat.isDirectory())
			{
				if (!fse.pathExistsSync(dest))
				{
					await fse.mkdirs(dest);
				}
				const items = await fs.promises.readdir(src);
				await Promise.all(items.map(item => fse.copy(join(src, item), join(dest, item), options)));
			}
			else
			{
				await fse.mkdirs(dirname(dest));
				await fs.promises.copyFile(src, dest, options?.overwrite === false ? fs.constants.COPYFILE_EXCL : 0);
			}
		},
		copySync: (src: string, dest: string, options?: any) =>
		{
			const stat = fs.statSync(src);
			if (stat.isDirectory())
			{
				if (!fse.pathExistsSync(dest))
				{
					fse.mkdirsSync(dest);
				}
				const items = fs.readdirSync(src);
				items.forEach(item => fse.copySync(join(src, item), join(dest, item), options));
			}
			else
			{
				fse.mkdirsSync(dirname(dest));
				fs.copyFileSync(src, dest, options?.overwrite === false ? fs.constants.COPYFILE_EXCL : 0);
			}
		},

		// cpSync
		cpSync: (src: string, dest: string, options?: any) =>
		{
			if (typeof fs.cpSync === 'function')
			{
				return fs.cpSync(src, dest, options);
			}
			return fse.copySync(src, dest, options);
		},

		// ==================== Special / 特殊功能 ====================
		/**
		 * 建立可處置的臨時目錄 / Create disposable temporary directory
		 *
		 * @see https://node.org.cn/api/fs.html#fsmkdtempdisposablesyncprefix-options
		 */
		mkdtempDisposableSync: ((prefix: string, options?: any) =>
		{
			const path = fs.mkdtempSync(prefix, options);

			const remove = () => fse.removeSync(path as any);

			const disposable = {
				path,
				[Symbol.dispose || Symbol.for('Symbol.dispose')]: () =>
				{
					fse.removeSync(path as any);
				},
				/**
				 * 官方不存在此屬性
				 */
				dispose: remove,
				remove,
			};
			return disposable;
		}) as any as typeof mkdtempDisposableSync,

		// statfsSync
		statfsSync: (path: string, options?: any) =>
		{
			if (typeof fs.statfsSync === 'function')
			{
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
			} as any;
		},

		// ==================== Ensure File / 確保檔案 ====================
		/** 確保檔案存在 / Ensure file exists */
		ensureFile: async (file: string) =>
		{
			if (fse.pathExistsSync(file)) return;
			await fse.mkdirs(dirname(file));
			return fs.promises.writeFile(file, '');
		},
		ensureFileSync: (file: string) =>
		{
			if (fse.pathExistsSync(file)) return;
			fse.mkdirsSync(dirname(file));
			return fs.writeFileSync(file, '');
		},
		createFile: async (file: string) => fse.ensureFile(file),
		createFileSync: (file: string) => fse.ensureFileSync(file),

		// aliases
		createLink: async (src: string, dest: string) => fse.ensureLink(src, dest),
		createLinkSync: (src: string, dest: string) => fse.ensureLinkSync(src, dest),
		createSymlink: async (src: string, dest: string, type?: any) => fse.ensureSymlink(src, dest, type),
		createSymlinkSync: (src: string, dest: string, type?: any) => fse.ensureSymlinkSync(src, dest, type),
		emptydir: async (dir: string) => fse.emptyDir(dir),
		emptydirSync: (dir: string) => fse.emptyDirSync(dir),
	} as any as IFakeFsExtra;

	(fse as any).readJSON = fse.readJson;
	(fse as any).readJSONSync = fse.readJsonSync;
	(fse as any).writeJSON = fse.writeJson;
	(fse as any).writeJSONSync = fse.writeJsonSync;
	(fse as any).outputJSON = fse.outputJson;
	(fse as any).outputJSONSync = fse.outputJsonSync;

	return fse as any;
}

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
export function getVolumeFromFs(fs: IFs)
{
	/**
	 * 來自官方原始碼
	 */
	return (fs as any).__vol as Volume;
}

/**
 * 取得不支援的方法清單
 * Get list of unsupported methods
 *
 * @returns 不支援的 fs-extra 方法名稱陣列 / Array of unsupported fs-extra method names
 *
 * @description 這些方法在 memfs 中無法實現或是因為瀏覽器環境限制
 * These methods cannot be implemented in memfs due to browser environment limitations
 */
export function _unSupportMethods()
{
	return [
		'FileReadStream',
		'FileWriteStream',
		'Utf8Stream',
		'Dir',

		'gracefulify',
	] as const;
}

export default extendWithFsExtraApi;
