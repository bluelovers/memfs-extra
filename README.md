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

```typescript
import { Volume } from 'memfs';
import { extendWithFsExtraApi } from 'memfs-extra';

// 建立 memfs Volume 並擴展為 fs-extra 風格 API
// Create memfs Volume and extend with fs-extra style APIs
const vol = new Volume();
const fs = extendWithFsExtraApi(vol);

// 建立目錄 / Create directory
await fs.mkdirs('/tmp/dir/subdir');

// 寫入檔案（會自動創建父目錄）/ Write file (auto-creates parent directories)
await fs.outputFile('/tmp/dir/file.txt', 'Hello World');

// 讀取 JSON / Read JSON
const data = await fs.readJson('/tmp/data.json');

// 複製檔案 / Copy file
await fs.copy('/tmp/source.txt', '/tmp/dest.txt');

// 移動檔案 / Move file
await fs.move('/tmp/old.txt', '/tmp/new.txt');

// 移除檔案 / Remove file
await fs.remove('/tmp/dir');
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

