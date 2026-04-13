## 1. 代碼註解更新

- [x] 1.1 為 extendWithFsExtraApi 主函式添加雙語區塊註解
- [x] 1.2 為 IFakeFsExtra 類型添加雙語區塊註解
- [x] 1.3 為 _unSupportMethods 函式添加雙語區塊註解
- [x] 1.4 為各類別 API 添加分組區塊註解（pathExists、mkdirs、remove、outputFile、JSON、emptyDir、ensureLink、ensureSymlink、move、copy、ensureFile、special）

## 2. README 文件更新

- [x] 2.1 檢查現有 README.md 結構
- [x] 2.2 添加安裝指令（pnpm install）
- [x] 2.3 添加使用範例（extendWithFsExtraApi）
- [x] 2.4 添加 API 清單分類

## 3. 測試檔案拆分（12個類別）

- [x] 3.1 建立 path-exists.spec.ts（pathExists、pathExistsSync）
- [x] 3.2 建立 mkdirs.spec.ts（mkdirs、mkdirsSync、mkdirp、mkdirpSync、ensureDir、ensureDirSync）
- [x] 3.3 建立 remove.spec.ts（remove、removeSync）
- [x] 3.4 建立 output-file.spec.ts（outputFile、outputFileSync）
- [x] 3.5 建立 json.spec.ts（readJson、readJsonSync、writeJson、writeJsonSync、outputJson、outputJsonSync）
- [x] 3.6 建立 empty-dir.spec.ts（emptyDir、emptyDirSync、emptydir、emptydirSync）
- [x] 3.7 建立 ensure-link.spec.ts（ensureLink、ensureLinkSync、createLink、createLinkSync）
- [x] 3.8 建立 ensure-symlink.spec.ts（ensureSymlink、ensureSymlinkSync、createSymlink、createSymlinkSync）
- [x] 3.9 建立 move.spec.ts（move、moveSync）
- [x] 3.10 建立 copy.spec.ts（copy、copySync、cpSync）
- [x] 3.11 建立 ensure-file.spec.ts（ensureFile、ensureFileSync、createFile、createFileSync）
- [x] 3.12 建立 special.spec.ts（mkdtempDisposableSync、statfsSync）

## 4. 測試實作

- [x] 4.1 實作 pathExists 類別測試
- [x] 4.2 實作 mkdirs 類別測試
- [x] 4.3 實作 remove 類別測試
- [x] 4.4 實作 outputFile 類別測試
- [x] 4.5 實作 JSON 類別測試
- [x] 4.6 實作 emptyDir 類別測試
- [x] 4.7 實作 ensureLink 類別測試
- [x] 4.8 實作 ensureSymlink 類別測試
- [x] 4.9 實作 move 類別測試
- [x] 4.10 實作 copy 類別測試
- [x] 4.11 實作 ensureFile 類別測試
- [x] 4.12 實作 special 類別測試（mkdtempDisposableSync、statfsSync）

## 5. 驗證

- [ ] 5.1 執行所有測試並確認通過
- [ ] 5.2 檢查測試覆蓋率
- [ ] 5.3 執行 typecheck