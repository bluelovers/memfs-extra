import { fs as _fs } from 'memfs';
import * as _fsExtra from 'fs-extra';
import { _getUnsupportMethods, IMemFsExtra } from '../../index';
import _fsNode from 'fs';

export function _createCheckImplementExistsTest(fse: IMemFsExtra, label: string)
{
	describe(`${label}`, () =>
	{
		describe('should have all expected fs-extra keys', () =>
		{
			const expectedKeys = new Set([
				'pathExists', 'pathExistsSync',
				'mkdirs', 'mkdirsSync', 'mkdirp', 'mkdirpSync', 'ensureDir', 'ensureDirSync',
				'remove', 'removeSync',
				'outputFile', 'outputFileSync',
				'readJson', 'readJsonSync', 'readJSON', 'readJSONSync',
				'writeJson', 'writeJsonSync', 'writeJSON', 'writeJSONSync',
				'outputJson', 'outputJsonSync', 'outputJSON', 'outputJSONSync',
				'emptyDir', 'emptyDirSync', 'emptydir', 'emptydirSync',
				'ensureLink', 'ensureLinkSync', 'createLink', 'createLinkSync',
				'ensureSymlink', 'ensureSymlinkSync', 'createSymlink', 'createSymlinkSync',
				'ensureFile', 'ensureFileSync', 'createFile', 'createFileSync',
				'move', 'moveSync',

				...Object.keys(_fsExtra).reduce((acc, key) =>
				{

					// @ts-ignore
					if (typeof _fsExtra[key] === 'function')
					{
						acc.push(key);
					}

					return acc;
				}, [] as string[]),
			]);

			[
				..._getUnsupportMethods(),
			].forEach(key =>
			{
				expectedKeys.delete(key)
			});

			expectedKeys.forEach(key =>
			{
				test(key, () =>
				{
					expect(fse).toHaveProperty(key);
					expect(typeof (fse as any)[key]).toBe('function');
					expect(typeof (fse as any)[key]).toMatchSnapshot();
				});
			});
		});

		describe('should have all expected fs keys', () =>
		{
			const expectedKeys = new Set([
				...Object.keys(_fsNode).reduce((acc, key) =>
				{

					// @ts-ignore
					if (typeof _fsNode[key] === 'function')
					{
						acc.push(key);
					}

					return acc;
				}, [] as string[]),
			]);

			[
				..._getUnsupportMethods(),
			].forEach(key =>
			{
				expectedKeys.delete(key)
			});

			expectedKeys.forEach(key =>
			{
				test(key, () =>
				{
					expect(fse).toHaveProperty(key);
					expect(typeof (fse as any)[key]).toBe('function');
					expect(typeof (fse as any)[key]).toMatchSnapshot();
				});
			});
		})

		describe('check others', () =>
		{
			[
				'StatWatcher',
				'FSWatcher',
				'WriteStream',
				'ReadStream',
				'promises',

				'realpath',
				'realpathSync',

				'__vol',
			]
				.forEach(key =>
				{
					test(key, () =>
					{
						expect(fse).toHaveProperty(key);
						expect(typeof (fse as any)[key]).toMatchSnapshot();
					});
				});

		})
	})
}
