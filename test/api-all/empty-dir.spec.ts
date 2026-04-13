/**
 * Empty Dir API 測試 / Empty Dir API tests
 *
 * @description 測試 emptyDir、emptyDirSync、emptydir、emptydirSync 功能
 * Tests emptyDir, emptyDirSync, emptydir, emptydirSync functionality
 */
/// <reference types="jest" />
import { fs as _fs, Volume } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('emptyDir', () =>
{
	let fs = extendWithFsExtraApi(_fs);

	describe('emptyDir (async)', () =>
	{
		it('should empty directory with contents', async () =>
		{
			await fs.mkdirsSync('/dir');
			await fs.writeFileSync('/dir/file1.txt', 'content1');
			await fs.writeFileSync('/dir/file2.txt', 'content2');
			await fs.emptyDir('/dir');
			const files = fs.readdirSync('/dir');
			expect(files).toHaveLength(0);
			const dirExists = fs.pathExistsSync('/dir');
			expect(dirExists).toBe(true);
		});

		it('should create directory if not exists', async () =>
		{
			await fs.emptyDir('/newdir');
			const exists = fs.pathExistsSync('/newdir');
			expect(exists).toBe(true);
		});
	});

	describe('emptyDirSync', () =>
	{
		it('should empty directory (sync)', () =>
		{
			fs.mkdirsSync('/dir');
			fs.writeFileSync('/dir/file.txt', 'content');
			fs.emptyDirSync('/dir');
			const files = fs.readdirSync('/dir');
			expect(files).toHaveLength(0);
		});

		it('should create directory if not exists (sync)', () =>
		{
			fs.emptyDirSync('/newdir');
			const exists = fs.pathExistsSync('/newdir');
			expect(exists).toBe(true);
		});
	});

	describe('emptydir (alias)', () =>
	{
		it('should be alias of emptyDir', async () =>
		{
			await fs.mkdirsSync('/dir');
			await fs.writeFileSync('/dir/file.txt', 'content');
			await fs.emptydir('/dir');
			const files = fs.readdirSync('/dir');
			expect(files).toHaveLength(0);
		});

		it('should be alias of emptyDirSync', () =>
		{
			fs.mkdirsSync('/dir');
			fs.writeFileSync('/dir/file.txt', 'content');
			fs.emptydirSync('/dir');
			const files = fs.readdirSync('/dir');
			expect(files).toHaveLength(0);
		});
	});
});
