/**
 * Move API 測試 / Move API tests
 *
 * @description 測試 move 和 moveSync 功能
 * Tests move and moveSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('move', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('move (async)', () =>
	{
		it('should move file', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.move('/source.txt', '/dest.txt');
			const exists = fs.pathExistsSync('/dest.txt');
			const sourceGone = fs.pathExistsSync('/source.txt');
			expect(exists).toBe(true);
			expect(sourceGone).toBe(false);
		});

		it('should move directory', async () =>
		{
			await fs.mkdirsSync('/source');
			await fs.writeFileSync('/source/file.txt', 'content');
			await fs.move('/source', '/dest');
			const exists = fs.pathExistsSync('/dest/file.txt');
			expect(exists).toBe(true);
		});

		it('should create parent directories', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.move('/source.txt', '/a/b/dest.txt');
			const exists = fs.pathExistsSync('/a/b/dest.txt');
			expect(exists).toBe(true);
		});

		it('should handle overwrite: false', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.writeFileSync('/dest.txt', 'existing');
			await fs.move('/source.txt', '/dest.txt', { overwrite: false });
			const content = fs.readFileSync('/dest.txt', 'utf-8');
			expect(content).toBe('existing');
		});

		it('should not overwrite when overwrite is false', async () =>
		{
			await fs.writeFileSync('/source.txt', 'new');
			await fs.writeFileSync('/dest.txt', 'existing');
			await fs.move('/source.txt', '/dest.txt', { overwrite: false });
			const content = fs.readFileSync('/dest.txt', 'utf-8');
			expect(content).toBe('existing');
		});
	});

	describe('moveSync', () =>
	{
		it('should move file (sync)', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.moveSync('/source.txt', '/dest.txt');
			const exists = fs.pathExistsSync('/dest.txt');
			expect(exists).toBe(true);
		});

		it('should move directory (sync)', () =>
		{
			fs.mkdirsSync('/source');
			fs.writeFileSync('/source/file.txt', 'content');
			fs.moveSync('/source', '/dest');
			const exists = fs.pathExistsSync('/dest/file.txt');
			expect(exists).toBe(true);
		});
	});
});
