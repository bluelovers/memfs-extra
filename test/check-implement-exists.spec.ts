//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />

import { vol, fs as _fs } from 'memfs';
import { _unSupportMethods, extendWithFsExtraApi } from '../index';
import * as _fsExtra from 'fs-extra';
import * as _fsNode from 'fs';

describe('should have all expected fs-extra keys', () =>
{
	const fs = extendWithFsExtraApi(_fs);
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

			if (typeof _fsExtra[key] === 'function')
			{
				acc.push(key);
			}

			return acc;
		}, [] as string[]),
	]);

	[
		..._unSupportMethods(),
	].forEach(key =>
	{
		expectedKeys.delete(key)
	});

	expectedKeys.forEach(key =>
	{
		test(key, () =>
		{
			expect(fs).toHaveProperty(key);
			expect(typeof (fs as any)[key]).toBe('function');
		});
	});
});

describe('should have all expected fs keys', () =>
{
	const fs = extendWithFsExtraApi(_fs);
	const expectedKeys = new Set([
		...Object.keys(_fsNode).reduce((acc, key) =>
		{

			if (typeof _fsNode[key] === 'function')
			{
				acc.push(key);
			}

			return acc;
		}, [] as string[]),
	]);

	[
		..._unSupportMethods(),
	].forEach(key =>
	{
		expectedKeys.delete(key)
	});

	expectedKeys.forEach(key =>
	{
		test(key, () =>
		{
			expect(fs).toHaveProperty(key);
			expect(typeof (fs as any)[key]).toBe('function');
		});
	});
})
