## Why

目前 `memfs-extra` 專案雖然已有部分註解，但缺乏完整的雙語註解（繁體中文 + 英文）覆蓋，導致：
1. 開發者難以理解每個函式的用途與參數語義
2. TypeScript IntelliSense 無法提供準確的提示資訊
3. README 文件需要補齊安裝指令與更清晰的範例

此外，專案缺少統一的程式碼風格規範，影響可維護性。

## What Changes

### 文件層面
- 更新所有主要匯出函式與類型，添加完整的雙語 JSDoc 註解
- 更新 README.md，補齊缺少的安裝指令與 API 說明

### 程式碼品質
- 確保所有 TypeScript 介面、函式、常數都有區塊註解 (`/** ... */`)
- 使用雙語格式（中文在前，英文在後）說明功能

## Capabilities

### New Capabilities
- `bilingual-comments`: 為專案添加完整的雙語註解覆蓋，包括：
  - 主要匯出函式（`extendWithFsExtraApi`, `getVolumeFromFs` 等）
  - TypeScript 型別定義（`IFakeFsExtra`, `IMemFsExtra` 等）
  - 常數與設定值
- `readme-update`: 更新 README 文件，包括：
  - 完整安裝指令（pnpm/yarn/npm）
  - 每個 API 的使用範例
  - 常見問題（FAQ）補充

### Modified Capabilities
（無）- 僅文件更新，不涉及功能變更

## Impact

- 受影響的檔案：`index.ts`, `fs-extra.ts`, `unionfs.ts`, `README.md`
- 不處理 `.d.ts` 檔案（自動生成）
- 無 API 變更，完全向後相容
- 依賴：無需新增依賴