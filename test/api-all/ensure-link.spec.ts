/**
 * Ensure Link API 測試 / Ensure Link API tests
 *
 * @description 測試 ensureLink、ensureLinkSync、createLink、createLinkSync 功能
 * Tests ensureLink, ensureLinkSync, createLink, createLinkSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('ensureLink', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('ensureLink (async)', () =>
	{
		it('should create hard link', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.ensureLink('/source.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});

		it('should do nothing if link exists', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.ensureLink('/source.txt', '/link.txt');
			await fs.ensureLink('/source.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});

		it('should create parent directories', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.ensureLink('/source.txt', '/a/b/link.txt');
			const exists = fs.pathExistsSync('/a/b/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('ensureLinkSync', () =>
	{
		it('should create hard link (sync)', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.ensureLinkSync('/source.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('createLink (alias)', () =>
	{
		it('should be alias of ensureLink', async () =>
		{
			await fs.writeFileSync('/source.txt', 'content');
			await fs.createLink('/source.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});

	describe('createLinkSync (alias)', () =>
	{
		it('should be alias of ensureLinkSync', () =>
		{
			fs.writeFileSync('/source.txt', 'content');
			fs.createLinkSync('/source.txt', '/link.txt');
			const exists = fs.pathExistsSync('/link.txt');
			expect(exists).toBe(true);
		});
	});
});
