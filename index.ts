import { IFs } from 'memfs';
import { dirname, join } from 'path';
import { mkdtempDisposableSync } from 'fs';
export type { PathOrFileDescriptor as IPathOrFileDescriptor } from 'fs';

export type IFakeFsExtra = Omit<typeof import('fs-extra'), 'FileReadStream' | 'FileWriteStream' | 'Utf8Stream' | 'Dir' | 'gracefulify'>;

export function extendWithFsExtraApi<T extends IFs>(fs: T): T & IFakeFsExtra
{
	const fse = {
		...fs,

		// path-exists
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

		// mkdirs
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

		// remove
		remove: async (path: string) =>
		{
			return fs.promises.rm(path, { recursive: true, force: true });
		},
		removeSync: (path: string) =>
		{
			return fs.rmSync(path, { recursive: true, force: true });
		},

		// outputFile
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

		// JSON
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

		// emptyDir
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

		// move
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

		// copy
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

		// mkdtempDisposableSync
		mkdtempDisposableSync: ((prefix: string, options?: any) =>
		{
			const path = fs.mkdtempSync(prefix, options);
			const disposable = {
				path,
				[Symbol.dispose || Symbol.for('Symbol.dispose')]: () =>
				{
					fse.removeSync(path as any);
				},
				dispose: () =>
				{
					fse.removeSync(path as any);
				},
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

		// ensureFile
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

export function _unSupportMethods()
{
	return [
		'FileReadStream',
		'FileWriteStream',
		'Utf8Stream',
		'Dir',

		'gracefulify',
	];
}

export default extendWithFsExtraApi;
