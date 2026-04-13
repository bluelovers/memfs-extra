//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
import fs from 'fs';
import { getVolumeFromFs } from '../../index';

jest.mock('fs', () => {
	return require('memfs-extra/fs-extra');
});

jest.mock('fs/promises', () => {
	return require('memfs-extra/fs-extra').promises;
});

describe('jest mock fs', () => {
	it('should mock fs, and has fs.readJSON', () => {
		expect(fs).toHaveProperty('readJSON');
	});

	it('should get volume from fs', () =>
	{
		const vol = getVolumeFromFs(fs as any);
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
