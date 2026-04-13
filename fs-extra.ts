import { fs } from 'memfs';
import { extendWithFsExtraApi } from './index';
export = extendWithFsExtraApi(fs);
