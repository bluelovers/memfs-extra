/**
 * Ensure File API 測試 / Ensure File API tests
 *
 * @description 測試 ensureFile、ensureFileSync、createFile、createFileSync 功能
 * Tests ensureFile, ensureFileSync, createFile, createFileSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('ensureFile', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('ensureFile (async)', () =>
	{
		it('should create empty file', async () =>
		{
			await fs.ensureFile('/newfile.txt');
			const exists = fs.pathExistsSync('/newfile.txt');
			expect(exists).toBe(true);
		});

		it('should do nothing if file exists', async () =>
		{
			await fs.writeFileSync('/file.txt', 'existing');
			await fs.ensureFile('/file.txt');
			const content = fs.readFileSync('/file.txt', 'utf-8');
			expect(content).toBe('existing');
		});

		it('should create parent directories', async () =>
		{
			await fs.ensureFile('/a/b/file.txt');
			const exists = fs.pathExistsSync('/a/b/file.txt');
			expect(exists).toBe(true);
		});
	});

	describe('ensureFileSync', () =>
	{
		it('should create empty file (sync)', () =>
		{
			fs.ensureFileSync('/newfile.txt');
			const exists = fs.pathExistsSync('/newfile.txt');
			expect(exists).toBe(true);
		});

		it('should do nothing if file exists (sync)', () =>
		{
			fs.writeFileSync('/file.txt', 'existing');
			fs.ensureFileSync('/file.txt');
			const content = fs.readFileSync('/file.txt', 'utf-8');
			expect(content).toBe('existing');
		});
	});

	describe('createFile (alias)', () =>
	{
		it('should be alias of ensureFile', async () =>
		{
			await fs.createFile('/newfile.txt');
			const exists = fs.pathExistsSync('/newfile.txt');
			expect(exists).toBe(true);
		});
	});

	describe('createFileSync (alias)', () =>
	{
		it('should be alias of ensureFileSync', () =>
		{
			fs.createFileSync('/newfile.txt');
			const exists = fs.pathExistsSync('/newfile.txt');
			expect(exists).toBe(true);
		});
	});
});
