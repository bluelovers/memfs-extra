//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
import fs from 'fs';

jest.mock('fs', () => {
	return require('memfs-extra/fs-extra');
});

jest.mock('fs/promises', () => {
	return require('memfs-extra/fs-extra').promises;
});

describe('jest mock fs', () => {
	it('should mock fs', () => {
		expect(fs).toHaveProperty('readJSON');
	});
});
