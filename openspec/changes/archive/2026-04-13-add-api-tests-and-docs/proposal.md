## Why

memfs-extra 為 memfs 提供 fs-extra 風格的 API 包裝，但目前缺乏完整的測試覆蓋與文件。為確保程式碼品質與可維護性，需要：
1. 為所有 56+ 個 API 添加測試覆蓋
2. 添加雙語註解（繁體中文 + 英文）來改進可讀性
3. 更新 README 文件，使開發者能快速理解與使用

**Why now?** 因為缺乏測試覆蓋導致難以安全地重構或擴展功能，且沒有適當的文件新手難以上手。

## What Changes

### 代碼改進
- 為 `index.ts` 添加符合規範的雙語區塊註解
- 修正現有註解格式（統一使用 `/** */` 區塊註解）

### 文件改進
- 建立或更新 `README.md`，包含安裝指示、使用範例、API 清單

### 測試改進
- 建立完整的測試覆蓋（目標：所有導出的 API 都有測試）
- 將測試拆分到多個分類的測試檔案

## Capabilities

### New Capabilities

分類方式：按功能類別拆分測試檔案，每個類別包含 async/sync 所有相關 API 的測試。

- `path-exists-api`: pathExists / pathExistsSync 測試
- `mkdirs-api`: mkdirs / mkdirsSync / mkdirp / mkdirpSync / ensureDir / ensureDirSync 測試
- `remove-api`: remove / removeDir / removeSync 測試
- `output-file-api`: outputFile / outputFileSync 測試
- `json-api`: readJson / readJsonSync / writeJson / writeJsonSync / outputJson / outputJsonSync 測試
- `empty-dir-api`: emptyDir / emptyDirSync / emptydir / emptydirSync 測試
- `ensure-link-api`: ensureLink / ensureLinkSync / createLink / createLinkSync 測試
- `ensure-symlink-api`: ensureSymlink / ensureSymlinkSync / createSymlink / createSymlinkSync 測試
- `move-api`: move / moveSync 測試
- `copy-api`: copy / copySync / cpSync 測試
- `ensure-file-api`: ensureFile / ensureFileSync / createFile / createFileSync 測試
- `special-api`: mkdtempDisposableSync / statfsSync 測試

## Impact

- **程式碼**: `index.ts`（主要模組）
- **文件**: `README.md`
- **測試**: `test/` 目錄下的測試檔案
- **依賴**: 測試框架（jest）、memfs、fs-extra