/**
 * Mkdirs API 測試 / Mkdirs API tests
 *
 * @description 測試 mkdirs、mkdirsSync、mkdirp、mkdirpSync、ensureDir、ensureDirSync 功能
 * Tests mkdirs, mkdirsSync, mkdirp, mkdirpSync, ensureDir, ensureDirSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('mkdirs', () =>
{
	let fs = extendWithFsExtraApi(_fs);

	describe('mkdirs (async)', () =>
	{
		it('should create nested directory', async () =>
		{
			await fs.mkdirs('/a/b/c');
			const exists = fs.pathExistsSync('/a/b/c');
			expect(exists).toBe(true);
		});

		it('should create directory with options', async () =>
		{
			await fs.mkdirs('/test/dir', { mode: 0o755 });
			const exists = fs.pathExistsSync('/test/dir');
			expect(exists).toBe(true);
		});
	});

	describe('mkdirsSync', () =>
	{
		it('should create nested directory (sync)', () =>
		{
			fs.mkdirsSync('/x/y/z');
			const exists = fs.pathExistsSync('/x/y/z');
			expect(exists).toBe(true);
		});
	});

	describe('mkdirp', () =>
	{
		it('should be alias of mkdirs', async () =>
		{
			await fs.mkdirp('/alias/test');
			const exists = fs.pathExistsSync('/alias/test');
			expect(exists).toBe(true);
		});
	});

	describe('mkdirpSync', () =>
	{
		it('should be alias of mkdirsSync', () =>
		{
			fs.mkdirpSync('/alias/sync');
			const exists = fs.pathExistsSync('/alias/sync');
			expect(exists).toBe(true);
		});
	});

	describe('ensureDir', () =>
	{
		it('should be alias of mkdirs', async () =>
		{
			await fs.ensureDir('/ensure/test');
			const exists = fs.pathExistsSync('/ensure/test');
			expect(exists).toBe(true);
		});
	});

	describe('ensureDirSync', () =>
	{
		it('should be alias of mkdirsSync', () =>
		{
			fs.ensureDirSync('/ensure/sync');
			const exists = fs.pathExistsSync('/ensure/sync');
			expect(exists).toBe(true);
		});
	});
});
