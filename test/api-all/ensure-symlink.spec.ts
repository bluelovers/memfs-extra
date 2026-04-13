/**
 * Ensure Symlink API 測試 / Ensure Symlink API tests
 *
 * @description 測試 ensureSymlink、ensureSymlinkSync、createSymlink、createSymlinkSync 功能
 * Tests ensureSymlink, ensureSymlinkSync, createSymlink, createSymlinkSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('ensureSymlink', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('ensureSymlink (async)', () =>
	{
		it('should create symbolic link', async () =>
		{
			await fs.writeFileSync('/target.txt', 'content');
			await fs.ensureSymlink('/target.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});

		it('should do nothing if symlink exists', async () =>
		{
			await fs.writeFileSync('/target.txt', 'content');
			await fs.ensureSymlink('/target.txt', '/link.txt');
			await fs.ensureSymlink('/target.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});

		it('should create symlink with type', async () =>
		{
			await fs.mkdirsSync('/dir');
			await fs.ensureSymlink('/dir', '/link', 'dir');
			const stat = fs.lstatSync('/link');
			expect(stat.isSymbolicLink()).toBe(true);
		});

		it('should create parent directories', async () =>
		{
			await fs.writeFileSync('/target.txt', 'content');
			await fs.ensureSymlink('/target.txt', '/a/b/link.txt');
			const exists = fs.pathExistsSync('/a/b/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('ensureSymlinkSync', () =>
	{
		it('should create symbolic link (sync)', () =>
		{
			fs.writeFileSync('/target.txt', 'content');
			fs.ensureSymlinkSync('/target.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('createSymlink (alias)', () =>
	{
		it('should be alias of ensureSymlink', async () =>
		{
			await fs.writeFileSync('/target.txt', 'content');
			await fs.createSymlink('/target.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('createSymlinkSync (alias)', () =>
	{
		it('should be alias of ensureSymlinkSync', () =>
		{
			fs.writeFileSync('/target.txt', 'content');
			fs.createSymlinkSync('/target.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});
});
