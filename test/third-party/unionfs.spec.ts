//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />

import { basename, dirname, extname } from 'path';
import { Union } from 'unionfs';
import { fs as memfs, Volume, createFsFromVolume } from 'memfs';
import actualFs from 'fs';
import { _unionfsFindMemFs, extendWithFsExtraApi, extendWithFsExtraApiFromUnionfs, getVolumeFromFs } from '../../index';
import { join } from 'upath2';
import { __TEST_TEMP } from '../__root';
import { _createCheckImplementExistsTest } from '../lib/test-impl';
import { fse } from '../lib/test';

const memfs2 = createFsFromVolume(new Volume());

const memfsArr = [
	[memfs, join(__TEST_TEMP, 'memfs1.txt'), 'memfs1'],
	[memfs2, join(__TEST_TEMP, 'memfs2.txt'), 'memfs2'],
] as const;

memfsArr.forEach((entry, index) =>
{
	entry[0].mkdirSync(dirname(entry[1]), {
		recursive: true,
	});

	entry[0].writeFileSync(entry[1], entry[2]);
});

const ufs = new Union()
	.use(memfs as any)
	.use(memfs2 as any)
	.use(actualFs)
;

describe(`unionfs`, () =>
{
	test.skip(`dummy`, () => {});

	test(`_unionfsFindMemFs`, () =>
	{

		let actual = _unionfsFindMemFs(ufs);
		let expected = {
			index: 0,
		};

		_test(actual, expected);
	});

	test(`_unionfsFindMemFs:fromRight`, () =>
	{

		let actual = _unionfsFindMemFs(ufs, true);
		let expected = {
			index: 1,
		};

		_test(actual, expected);
	});

	test(`read file from memfsArr`, () =>
	{
		memfsArr.forEach((entry, index) =>
		{
			expect(ufs.readFileSync(entry[1]).toString()).toStrictEqual(entry[2]);
		});
	});

	describe(`extendWithFsExtraApi`, () =>
	{
		const fse = extendWithFsExtraApiFromUnionfs(ufs);

		test('getVolumeFromFs', () => {
			expect(() => getVolumeFromFs(fse)).not.toThrow();
		});

		_createCheckImplementExistsTest(fse, `unionfs`);
	});

	function _test(actual: ReturnType<typeof _unionfsFindMemFs>, expected: Partial<ReturnType<typeof _unionfsFindMemFs>>)
	{
		expect(actual).toMatchObject(expected);
		expect(() => getVolumeFromFs(actual.memfs)).not.toThrow();

		expect(actual.memfs).toBe(memfsArr[actual.index][0]);

		expect(actual.memfs.readFileSync(memfsArr[actual.index][1]).toString()).toStrictEqual(memfsArr[actual.index][2]);

		const idx = (actual.index === 0) ? memfsArr.length - 1 : 0;
		expect(actual.memfs.existsSync(memfsArr[idx][1])).toBeFalsy();
	}

})
