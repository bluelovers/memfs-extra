//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />

import { _createCheckImplementExistsTest } from './lib/test-impl';
import { fse } from './lib/test';
import extendWithFsExtraApi from '../index';
import fs from 'fs';

_createCheckImplementExistsTest(fse, `memfs-extra`);

// _createCheckImplementExistsTest(extendWithFsExtraApi(fs as any), `fs`);
