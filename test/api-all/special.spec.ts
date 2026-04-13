/**
 * Special API 測試 / Special API tests
 *
 * @description 測試 mkdtempDisposableSync 和 statfsSync 功能
 * Tests mkdtempDisposableSync and statfsSync functionality
 */
/// <reference types="jest" />
import { fs as _fs, Volume, vol } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('special', () =>
{
	let fs = extendWithFsExtraApi(_fs);

	beforeAll(() => {
		fs.ensureDirSync('/tmp');
	})

	describe('mkdtempDisposableSync', () =>
	{
		it('should create temp directory', () =>
		{
			const temp = fs.mkdtempDisposableSync('/tmp/test-');
			expect(temp.path).toContain('/tmp/test-');
			const exists = fs.pathExistsSync(temp.path);
			expect(exists).toBe(true);
		});

		it('should have dispose method', () =>
		{
			const temp = fs.mkdtempDisposableSync('/tmp/test-');
			console.dir(temp);
			expect(typeof temp.remove).toBe('function');
		});

		it('should cleanup on dispose', () =>
		{
			const temp = fs.mkdtempDisposableSync('/tmp/test-');
			temp.remove();
			const exists = fs.pathExistsSync(temp.path);
			expect(exists).toBe(false);
		});

		it('should cleanup on Symbol.dispose', () =>
		{
			const temp = fs.mkdtempDisposableSync('/tmp/test-');
			temp[Symbol.dispose]();
			const exists = fs.pathExistsSync(temp.path);
			expect(exists).toBe(false);
		});
	});

	describe('statfsSync', () =>
	{
		it('should return filesystem stats', () =>
		{
			const stats = fs.statfsSync('/test');
			expect(stats).toHaveProperty('type');
			expect(stats).toHaveProperty('bsize');
			expect(stats).toHaveProperty('blocks');
			expect(stats).toHaveProperty('bfree');
			expect(stats).toHaveProperty('bavail');
			expect(stats).toHaveProperty('files');
			expect(stats).toHaveProperty('ffree');
		});

		it('should return mock for memfs without native statfsSync', () =>
		{
			const stats = fs.statfsSync('/test');
			expect(stats.type).toBe(0);
			expect(stats.bsize).toBe(4096);
		});
	});
});
