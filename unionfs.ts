import { extendWithFsExtraApiFromUnionfs } from './index';
import { fs as memfs } from 'memfs';
import actualFs from 'fs';
import { Union } from 'unionfs';

const ufs = new Union()
	.use(memfs as any)
	.use(actualFs)
;

export = extendWithFsExtraApiFromUnionfs(ufs);
