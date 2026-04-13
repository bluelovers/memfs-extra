/**
 * JSON API 測試 / JSON API tests
 *
 * @description 測試 readJson、readJsonSync、writeJson、writeJsonSync、outputJson、outputJsonSync 功能
 * Tests readJson, readJsonSync, writeJson, writeJsonSync, outputJson, outputJsonSync functionality
 */
/// <reference types="jest" />
import { fs as _fs } from 'memfs';
import { extendWithFsExtraApi } from '../../index';

describe('JSON', () =>
{
	let fs: ReturnType<typeof extendWithFsExtraApi>;

	beforeEach(() =>
	{
		fs = extendWithFsExtraApi(_fs);
	});

	describe('readJson (async)', () =>
	{
		it('should read and parse JSON file', async () =>
		{
			await fs.writeFileSync('/data.json', JSON.stringify({ name: 'test' }));
			const result = await fs.readJson('/data.json');
			expect(result).toEqual({ name: 'test' });
		});
	});

	describe('readJsonSync', () =>
	{
		it('should read and parse JSON file (sync)', () =>
		{
			fs.writeFileSync('/data.json', JSON.stringify({ name: 'test' }));
			const result = fs.readJsonSync('/data.json');
			expect(result).toEqual({ name: 'test' });
		});
	});

	describe('writeJson (async)', () =>
	{
		it('should stringify and write JSON', async () =>
		{
			await fs.writeJson('/data.json', { name: 'test' });
			const content = fs.readFileSync('/data.json', 'utf-8');
			expect(content).toContain('"name"');
		});

		it('should write with spaces', async () =>
		{
			await fs.writeJson('/data.json', { name: 'test' }, { spaces: 2 });
			const content = fs.readFileSync('/data.json', 'utf-8');
			expect(content).toBe('{\n  "name": "test"\n}');
		});
	});

	describe('writeJsonSync', () =>
	{
		it('should stringify and write JSON (sync)', () =>
		{
			fs.writeJsonSync('/data.json', { name: 'test' });
			const content = fs.readFileSync('/data.json', 'utf-8');
			expect(content).toContain('"name"');
		});
	});

	describe('outputJson (async)', () =>
	{
		it('should write JSON and create parent directories', async () =>
		{
			await fs.outputJson('/a/b/data.json', { name: 'test' });
			const exists = fs.pathExistsSync('/a/b/data.json');
			expect(exists).toBe(true);
		});
	});

	describe('outputJsonSync', () =>
	{
		it('should write JSON and create parent directories (sync)', () =>
		{
			fs.outputJsonSync('/a/b/data.json', { name: 'test' });
			const exists = fs.pathExistsSync('/a/b/data.json');
			expect(exists).toBe(true);
		});
	});

	describe('aliases', () =>
	{
		it('readJSON should alias readJson', async () =>
		{
			await fs.writeFileSync('/data.json', JSON.stringify({ name: 'test' }));
			const result = await (fs as any).readJSON('/data.json');
			expect(result).toEqual({ name: 'test' });
		});

		it('writeJSON should alias writeJson', async () =>
		{
			await (fs as any).writeJSON('/data.json', { name: 'test' });
			const content = fs.readFileSync('/data.json', 'utf-8');
			expect(content).toContain('"name"');
		});
	});
});
