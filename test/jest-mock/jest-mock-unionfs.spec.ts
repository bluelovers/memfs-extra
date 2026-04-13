//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
import fs from 'fs';
import { getVolumeFromFs } from '../../index';

/**
 * 此方法暫稱為 inline mock
 * 必須直接放在測試項目內才會有效
 */
jest.mock('fs', () =>
{
	return require('memfs-extra/unionfs');
});

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
		const vol = getVolumeFromFs(fs);

		vol.fromJSON({
			'./test-not-exists': 'abc',
		});

		expect(fs.readFileSync('./test-not-exists').toString()).toBe('abc');
	});
});
