import { vol, fs as _fs } from 'memfs';
import extendWithFsExtraApi from '../../index';

export const fse = extendWithFsExtraApi(_fs);
