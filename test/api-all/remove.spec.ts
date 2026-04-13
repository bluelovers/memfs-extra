/**
 * Remove API 測試 / Remove API tests
 *
 * @description 測試 remove 和 removeSync 功能
 * Tests remove and removeSync functionality
 */
/// <reference types="jest" />
import { fs as _fs, Volume } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('remove', () =>
{
	let fs = extendWithFsExtraApi(_fs);

	describe('remove (async)', () =>
	{
		it('should remove file', async () =>
		{
			await fs.writeFileSync('/file.txt', 'content');
			await fs.remove('/file.txt');
			const exists = fs.pathExistsSync('/file.txt');
			expect(exists).toBe(false);
		});

		it('should remove directory with content', async () =>
		{
			await fs.mkdirsSync('/dir');
			await fs.writeFileSync('/dir/file.txt', 'content');
			await fs.remove('/dir');
			const exists = fs.pathExistsSync('/dir');
			expect(exists).toBe(false);
		});
	});

	describe('removeSync', () =>
	{
		it('should remove file (sync)', () =>
		{
			fs.writeFileSync('/file.txt', 'content');
			fs.removeSync('/file.txt');
			const exists = fs.pathExistsSync('/file.txt');
			expect(exists).toBe(false);
		});

		it('should remove directory (sync)', () =>
		{
			fs.mkdirsSync('/dir');
			fs.removeSync('/dir');
			const exists = fs.pathExistsSync('/dir');
			expect(exists).toBe(false);
		});
	});
});
