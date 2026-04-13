/**
 * Path Exists API 測試 / Path Exists API tests
 *
 * @description 測試 pathExists 和 pathExistsSync 功能
 * Tests pathExists and pathExistsSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('pathExists', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('pathExists (async)', () =>
	{
		it('should return true for existing path', async () =>
		{
			await fs.mkdirsSync('/test/dir');
			const result = await fs.pathExists('/test/dir');
			expect(result).toBe(true);
		});

		it('should return false for non-existing path', async () =>
		{
			const result = await fs.pathExists('/non/existent');
			expect(result).toBe(false);
		});
	});

	describe('pathExistsSync', () =>
	{
		it('should return true for existing path (sync)', () =>
		{
			fs.mkdirsSync('/test/dir');
			const result = fs.pathExistsSync('/test/dir');
			expect(result).toBe(true);
		});

		it('should return false for non-existing path (sync)', () =>
		{
			const result = fs.pathExistsSync('/non/existent');
			expect(result).toBe(false);
		});
	});
});
