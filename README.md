# memfs-extra

為 `memfs` 提供 `fs-extra` 的 API 擴展支援 (Providing `fs-extra` API extension support for `memfs`)

## 安裝 (Installation)

```bash
# 使用 pnpm（推薦 / Recommended）
pnpm add memfs-extra memfs @types/fs-extra

# 使用 yarn-tool / Using yarn-tool
yarn-tool add memfs-extra memfs @types/fs-extra
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add memfs-extra memfs @types/fs-extra

# 使用 yarn
yarn add memfs-extra memfs @types/fs-extra

# 使用 npm
npm install memfs-extra memfs @types/fs-extra
```

> [!IMPORTANT]
> 安裝時，請確保你也自行安裝了 `memfs` 與 `@types/fs-extra` (When installing, please ensure you also manually install `memfs` and `@types/fs-extra`)

## 使用範例 (Usage Example)

### Jest Mock 範例 (Jest Mock Example)

這個範例展示了如何使用 `memfs-extra/fs-extra` 來 mock Node.js 的 `fs` 模組，使其具備 `fs-extra` 的 API 支援。

This example demonstrates how to use `memfs-extra/fs-extra` to mock Node.js's `fs` module, providing support for `fs-extra` APIs.

關於 JEST 的詳細使用方式請查閱 [JEST_MOCK.md](./JEST_MOCK.md)

```typescript
//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
import fs from 'fs';
import { getVolumeFromFs } from '../../index';

jest.mock('fs', () =>
{
	return require('memfs-extra/fs-extra');
});

jest.mock('fs/promises', () =>
{
	return require('memfs-extra/fs-extra').promises;
});

describe('jest mock fs', () =>
{
	it('should mock fs, and has fs.readJSON', () =>
	{
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
```

#### 使用 unionfs 如果你希望同時看到「真實硬碟」和「記憶體虛擬硬碟」，

```bash
pnpm add unionfs
```

```ts
jest.mock('fs', () =>
{
	return require('memfs-extra/unionfs');
});
```

### 使用 extendWithFsExtraApi（使用 memfs 匯出的 fs）

```typescript
import { fs } from 'memfs';
import { extendWithFsExtraApi } from 'memfs-extra';

// 直接傳入 memfs 匯出的 fs 物件
// Pass memfs exported fs object
const fse = extendWithFsExtraApi(fs);

// 使用相同的 API
await fse.mkdirs('/tmp/dir');
```

### 使用 extendWithFsExtraApiFromVolume（使用 memfs 匯出的 vol）

```typescript
import { vol } from 'memfs';
import { extendWithFsExtraApiFromVolume, getVolumeFromFs } from 'memfs-extra';

// vol 是 memfs 匯出的預設 Volume 實例
// vol is memfs exported default Volume instance
const fse = extendWithFsExtraApiFromVolume(vol);

// 建立目錄 / Create directory
await fse.mkdirs('/tmp/dir/subdir');

// 寫入檔案（會自動創建父目錄）/ Write file (auto-creates parent directories)
await fse.outputFile('/tmp/dir/file.txt', 'Hello World');

// 讀取 JSON / Read JSON
const data = await fse.readJson('/tmp/data.json');

// 複製檔案 / Copy file
await fse.copy('/tmp/source.txt', '/tmp/dest.txt');

// 移動檔案 / Move file
await fse.move('/tmp/old.txt', '/tmp/new.txt');

// 移除檔案 / Remove file
await fse.remove('/tmp/dir');

// 取得底層 Volume（可用於儲存/還原狀態、複製等）
// Get underlying Volume (for save/restore state, clone, etc.)
const originalVol = getVolumeFromFs(fse);
const data = originalVol.toJSON();
```

## API 清單 (API List)

### 路徑存在檢查 (Path Exists)
- `pathExists(path)` - 非同步檢查路徑是否存在
- `pathExistsSync(path)` - 同步檢查路徑是否存在

### 目錄操作 (Directory Operations)
- `mkdirs(dir, options?)` - 遞迴建立目錄
- `mkdirsSync(dir, options?)` - 同步遞迴建立目錄
- `mkdirp()` / `mkdirpSync()` - `mkdirs` 的別名
- `ensureDir()` / `ensureDirSync()` - `mkdirs` 的別名

### 檔案操作 (File Operations)
- `outputFile(file, data, options?)` - 寫入檔案並創建父目錄
- `outputFileSync(file, data, options?)` - 同步寫入檔案
- `ensureFile(file)` - 確保檔案存在
- `ensureFileSync(file)` - 同步確保檔案存在
- `createFile()` / `createFileSync()` - `ensureFile` 的別名

### JSON 操作 (JSON Operations)
- `readJson(file, options?)` - 讀取並解析 JSON 檔案
- `readJsonSync(file, options?)` - 同步讀取 JSON
- `writeJson(file, obj, options?)` - 寫入 JSON 檔案
- `writeJsonSync(file, obj, options?)` - 同步寫入 JSON
- `outputJson()` / `outputJsonSync()` - 自動創建父目錄的 JSON 寫入
- `readJSON()` / `readJSONSync()` / `writeJSON()` / `writeJSONSync()` / `outputJSON()` / `outputJSONSync()` - 駝峰命名別名

### 移除操作 (Remove Operations)
- `remove(path)` - 遞迴移除檔案或目錄
- `removeSync(path)` - 同步遞迴移除

### 目錄內容管理 (Directory Content Management)
- `emptyDir(dir)` - 清空目錄內容但保留目錄
- `emptyDirSync(dir)` - 同步清空目錄
- `emptydir()` / `emptydirSync()` - `emptyDir` 的別名

### 連結操作 (Link Operations)
- `ensureLink(src, dest)` - 建立硬連結
- `ensureLinkSync(src, dest)` - 同步建立硬連結
- `createLink()` / `createLinkSync()` - `ensureLink` 的別名
- `ensureSymlink(src, dest, type?)` - 建立符號連結
- `ensureSymlinkSync(src, dest, type?)` - 同步建立符號連結
- `createSymlink()` / `createSymlinkSync()` - `ensureSymlink` 的別名

### 移動與複製 (Move & Copy)
- `move(src, dest, options?)` - 移動或重新命名
- `moveSync(src, dest, options?)` - 同步移動
- `copy(src, dest, options?)` - 複製檔案或目錄
- `copySync(src, dest, options?)` - 同步複製
- `cpSync(src, dest, options?)` - 原生複製或使用 copySync

### 特殊功能 (Special)
- `mkdtempDisposableSync(prefix)` - 建立可處置的臨時目錄
- `statfsSync(path)` - 取得檔案系統統計資訊

## FAQ

### Q: Mock 後需要讀取真實的配置文件、測試樣本（fixtures）

這是一個非常經典的挑戰！一旦你使用了 `jest.mock('fs')`，Jest 就會把整個 `fs` 模塊替換掉，導致你的測試環境變成了「全虛擬」的隔離空間。

這是 Jest 提供的官方後門，讓你在 Mock 環境中依然能抓回原始的 fs 模塊。

```ts
jest.requireActual('fs')
```

### Q: 無限遞迴（Infinite Recursion）

> RangeError: Maximum call stack size exceeded

修正方案：使用 `jest.requireActual`

如果你是在 `__mocks__/fs.js` 檔案中，或者是透過 `jest.mock` 的 factory function 定義，必須使用 Jest 提供的專門方法來獲取「真正的」原生模塊。

```ts
// __mocks__/fs.js
const actualFs = jest.requireActual('fs');
const Union = require('unionfs').Union;
const ufs = new Union()
	.use(require('memfs').fs)
	.use(actualFs);
module.exports = require('memfs-extra').extendWithFsExtraApiFromUnionfs(ufs);
```
