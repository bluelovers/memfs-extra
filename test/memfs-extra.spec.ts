import { vol } from 'memfs';
import { extendWithFsExtraApi } from '../index';


describe('memfs-extra', () => {
	beforeEach(() => {
		vol.reset();
	});

	it('should provide pathExists', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/foo': 'bar',
		});

		expect(await fs.pathExists('/foo')).toBe(true);
		expect(await fs.pathExists('/bar')).toBe(false);
		expect(fs.pathExistsSync('/foo')).toBe(true);
		expect(fs.pathExistsSync('/bar')).toBe(false);
	});

	it('should provide mkdirs', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		await fs.mkdirs('./temp/a/b/c');
		expect(vol.statSync('./temp/a/b/c').isDirectory()).toBe(true);

		fs.mkdirsSync('./temp/d/e/f');
		expect(vol.statSync('./temp/d/e/f').isDirectory()).toBe(true);
	});

	it('should provide remove', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'./temp/a/b': 'c',
		});

		await fs.remove('./temp/a/b');
		expect(fs.pathExistsSync('./temp/a/b')).toBe(false);

		vol.fromJSON({
			'./temp/d/e': 'f',
		});
		fs.removeSync('./temp/d/e');
		expect(fs.pathExistsSync('./temp/d/e')).toBe(false);
	});

	it('should provide outputFile', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		await fs.outputFile('./temp/x/y/z.txt', 'hello');
		expect(vol.readFileSync('./temp/x/y/z.txt', 'utf8')).toBe('hello');

		fs.outputFileSync('./temp/i/j/k.txt', 'world');
		expect(vol.readFileSync('./temp/i/j/k.txt', 'utf8')).toBe('world');
	});

	it('should provide json methods', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		const data = { a: 1 };
		await fs.outputJson('/data.json', data);
		expect(await fs.readJson('/data.json')).toEqual(data);

		const data2 = { b: 2 };
		fs.outputJsonSync('/data2.json', data2);
		expect(fs.readJsonSync('/data2.json')).toEqual(data2);

		await fs.writeJson('/data3.json', data);
		expect(await fs.readJSON('/data3.json')).toEqual(data);
	});

	it('should provide emptyDir', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/empty/a.txt': 'hello',
			'/empty/b/c.txt': 'world',
		});

		await fs.emptyDir('/empty');
		expect(vol.readdirSync('/empty').length).toBe(0);

		vol.fromJSON({
			'/emptySync/a.txt': 'hello',
		});
		fs.emptyDirSync('/emptySync');
		expect(vol.readdirSync('/emptySync').length).toBe(0);
	});

	it('should provide move', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/src.txt': 'hello',
		});

		await fs.move('/src.txt', '/dest.txt');
		expect(fs.pathExistsSync('/src.txt')).toBe(false);
		expect(vol.readFileSync('/dest.txt', 'utf8')).toBe('hello');

		vol.fromJSON({
			'/srcSync.txt': 'world',
		});
		fs.moveSync('/srcSync.txt', '/destSync.txt');
		expect(fs.pathExistsSync('/srcSync.txt')).toBe(false);
		expect(vol.readFileSync('/destSync.txt', 'utf8')).toBe('world');
	});

	it('should provide ensureFile', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		await fs.ensureFile('/a/b/c.txt');
		expect(fs.pathExistsSync('/a/b/c.txt')).toBe(true);

		fs.ensureFileSync('/d/e/f.txt');
		expect(fs.pathExistsSync('/d/e/f.txt')).toBe(true);
	});

	it('should provide copy', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/copy-src/a.txt': 'hello',
			'/copy-src/b/c.txt': 'world',
		});

		await fs.copy('/copy-src', '/copy-dest');
		expect(vol.readFileSync('/copy-dest/a.txt', 'utf8')).toBe('hello');
		expect(vol.readFileSync('/copy-dest/b/c.txt', 'utf8')).toBe('world');

		fs.copySync('/copy-src', '/copy-dest-sync');
		expect(vol.readFileSync('/copy-dest-sync/a.txt', 'utf8')).toBe('hello');
		expect(vol.readFileSync('/copy-dest-sync/b/c.txt', 'utf8')).toBe('world');
	});

	it('should provide cpSync', () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/cp-src.txt': 'hello cp',
		});

		fs.cpSync('/cp-src.txt', '/cp-dest.txt');
		expect(vol.readFileSync('/cp-dest.txt', 'utf8')).toBe('hello cp');
	});

	it('should provide mkdtempDisposableSync', () => {
		const fs = extendWithFsExtraApi(vol as any);
		const disposable = fs.mkdtempDisposableSync('/tmp-');
		expect(disposable.path).toMatch(/^\/tmp-/);
		expect(fs.pathExistsSync(disposable.path)).toBe(true);

		disposable.dispose();
		expect(fs.pathExistsSync(disposable.path)).toBe(false);
	});

	it('should provide statfsSync', () => {
		const fs = extendWithFsExtraApi(vol as any);
		const stats = fs.statfsSync('/');
		expect(stats).toHaveProperty('bsize');
	});

	it('should provide ensureLink and createLink', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/src-link.txt': 'link content',
		});

		await fs.ensureLink('/src-link.txt', '/dest-link.txt');
		expect(vol.readFileSync('/dest-link.txt', 'utf8')).toBe('link content');

		fs.ensureLinkSync('/src-link.txt', '/dest-link-sync.txt');
		expect(vol.readFileSync('/dest-link-sync.txt', 'utf8')).toBe('link content');

		await fs.createLink('/src-link.txt', '/dest-create-link.txt');
		expect(vol.readFileSync('/dest-create-link.txt', 'utf8')).toBe('link content');

		fs.createLinkSync('/src-link.txt', '/dest-create-link-sync.txt');
		expect(vol.readFileSync('/dest-create-link-sync.txt', 'utf8')).toBe('link content');
	});

	it('should provide ensureSymlink and createSymlink', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/src-symlink.txt': 'symlink content',
		});

		await fs.ensureSymlink('/src-symlink.txt', '/dest-symlink.txt');
		expect(vol.readlinkSync('/dest-symlink.txt')).toBe('/src-symlink.txt');

		fs.ensureSymlinkSync('/src-symlink.txt', '/dest-symlink-sync.txt');
		expect(vol.readlinkSync('/dest-symlink-sync.txt')).toBe('/src-symlink.txt');

		await fs.createSymlink('/src-symlink.txt', '/dest-create-symlink.txt');
		expect(vol.readlinkSync('/dest-create-symlink.txt')).toBe('/src-symlink.txt');

		fs.createSymlinkSync('/src-symlink.txt', '/dest-create-symlink-sync.txt');
		expect(vol.readlinkSync('/dest-create-symlink-sync.txt')).toBe('/src-symlink.txt');
	});

	it('should provide createFile aliases', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		await fs.createFile('/a/b/c-alias.txt');
		expect(fs.pathExistsSync('/a/b/c-alias.txt')).toBe(true);

		fs.createFileSync('/d/e/f-alias.txt');
		expect(fs.pathExistsSync('/d/e/f-alias.txt')).toBe(true);
	});

	it('should provide emptydir aliases', async () => {
		const fs = extendWithFsExtraApi(vol as any);
		vol.fromJSON({
			'/empty-alias/a.txt': 'hello',
		});

		await fs.emptydir('/empty-alias');
		expect(vol.readdirSync('/empty-alias').length).toBe(0);

		vol.fromJSON({
			'/emptySync-alias/a.txt': 'hello',
		});
		fs.emptydirSync('/emptySync-alias');
		expect(vol.readdirSync('/emptySync-alias').length).toBe(0);
	});
});
