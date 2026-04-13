/**
 * Copy API 測試 / Copy API tests
 *
 * @description 測試 copy、copySync、cpSync 功能
 * Tests copy, copySync, cpSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('copy', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('copy (async)', () =>
	{
		it('should copy file', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.copy('/source.txt', '/dest.txt');
			const exists = fs.pathExistsSync('/dest.txt');
			expect(exists).toBe(true);
		});

		it('should copy directory', async () =>
		{
			await fs.mkdirsSync('/source');
			await fs.writeFileSync('/source/file.txt', 'content');
			await fs.copy('/source', '/dest');
			const exists = fs.pathExistsSync('/dest/file.txt');
			expect(exists).toBe(true);
		});

		it('should copy file to new location', async () =>
		{
			await fs.writeFileSync('/source.txt', 'new');
			await fs.copy('/source.txt', '/dest.txt');
			const content = fs.readFileSync('/dest.txt', 'utf-8');
			expect(content).toBe('new');
		});
	});

	describe('copySync', () =>
	{
		it('should copy file (sync)', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.copySync('/source.txt', '/dest.txt');
			const exists = fs.pathExistsSync('/dest.txt');
			expect(exists).toBe(true);
		});

		it('should copy directory (sync)', () =>
		{
			fs.mkdirsSync('/source');
			fs.writeFileSync('/source/file.txt', 'content');
			fs.copySync('/source', '/dest');
			const exists = fs.pathExistsSync('/dest/file.txt');
			expect(exists).toBe(true);
		});
	});

	describe('cpSync', () =>
	{
		it('should use native copy if available', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.cpSync('/source.txt', '/dest.txt');
			const exists = fs.pathExistsSync('/dest.txt');
			expect(exists).toBe(true);
		});

		it('should fallback to copySync', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.cpSync('/source.txt', '/dest.txt');
			const content = fs.readFileSync('/dest.txt', 'utf-8');
			expect(content).toBe('content');
		});
	});
});
