/**
 * Output File API 測試 / Output File API tests
 *
 * @description 測試 outputFile 和 outputFileSync 功能
 * Tests outputFile and outputFileSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('outputFile', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('outputFile (async)', () =>
	{
		it('should write file and create parent directories', async () =>
		{
			await fs.outputFile('/a/b/file.txt', 'content');
			const exists = fs.pathExistsSync('/a/b/file.txt');
			expect(exists).toBe(true);
		});

		it('should overwrite existing file', async () =>
		{
			await fs.writeFileSync('/file.txt', 'old');
			await fs.outputFile('/file.txt', 'new');
			const content = fs.readFileSync('/file.txt', 'utf-8');
			expect(content).toBe('new');
		});
	});

	describe('outputFileSync', () =>
	{
		it('should write file and create parent directories (sync)', () =>
		{
			fs.outputFileSync('/a/b/file.txt', 'content');
			const exists = fs.pathExistsSync('/a/b/file.txt');
			expect(exists).toBe(true);
		});

		it('should overwrite existing file (sync)', () =>
		{
			fs.writeFileSync('/file.txt', 'old');
			fs.outputFileSync('/file.txt', 'new');
			const content = fs.readFileSync('/file.txt', 'utf-8');
			expect(content).toBe('new');
		});
	});
});
