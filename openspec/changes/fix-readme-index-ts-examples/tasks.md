## 1. 修正 README.md 錯誤範例

- [x] 1.1 修正第 28-54 行的使用範例
  - 將 `const vol = new Volume(); const fs = extendWithFsExtraApi(vol);` 改為正確語法
  - 使用 `import { fs } from 'memfs'; const fse = extendWithFsExtraApi(fs);`

## 2. 修正 index.ts JSDoc 註解

- [x] 2.1 修正 extendWithFsExtraApi 函式的 JSDoc 範例（第 22-31 行）
  - 更新 `@example` 區塊使用正確的語法
  - 添加說明區分 `extendWithFsExtraApi(fs)` 與 `extendWithFsExtraApiFromVolume(vol)` 的使用時機
- [x] 2.2 更新 extendWithFsExtraApiFromVolume 的說明文件
  - 添加明確的使用警告說明這是特定用途函式

## 3. 驗證更新

- [x] 3.1 確認 README.md 範例語法正確且可運作
- [x] 3.2 確認 index.ts JSDoc 文件正確顯示