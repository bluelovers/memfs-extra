//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
import fs from 'fs';
import { getVolumeFromFs } from '../../index';

/**
 * 此方法暫稱為 share mock
 * 必須存在 __mocks__/fs.js 注意副檔名是 .js 才會有效
 *
 * @see https://titangene.github.io/article/jest-manual-mocks.html
 *
 * 檔案內容為
 * @example
 * // 必須存在 __mocks__/fs.js 注意副檔名是 .js 才會有效
 * module.exports = require('memfs-extra').extendWithFsExtraApi(require('memfs').fs);
 *
 * ...
 *
 * 然後在測試檔案內放置 jest.mock('fs');
 */
jest.mock('fs');

describe('jest mock fs', () => {
	it('should mock fs, and has fs.readJSON', () => {
		expect(fs).toHaveProperty('readJSON');
	});

	it('should get volume from fs', () =>
	{
		const vol = getVolumeFromFs(fs);
		expect(vol).toHaveProperty('fromJSON');
	});

	it('should can control volume', () =>
	{
		const vol = getVolumeFromFs(fs as any);

		vol.fromJSON({
			'./test-not-exists': 'abc',
		});

		expect(fs.readFileSync('./test-not-exists').toString()).toBe('abc');
	});
});
