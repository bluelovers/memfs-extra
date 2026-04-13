## Why

目前 README.md 和 index.ts 中的 API 範例存在錯誤，許多範例展示了不正確的使用方式（例如：`new Volume()` + `extendWithFsExtraApi(vol)`），這會導致開發者誤用 API，無法正確發揮 `extendWithFsExtraApi` 的效益。雖然已提供 `extendWithFsExtraApiFromVolume` 函式來防止錯誤使用，但缺乏清晰的說明文件和正確的範例，開發者仍可能沿用錯誤模式。

## What Changes

1. **更新 README.md 中的錯誤範例** - 修正所有展示錯誤 API 使用方式的範例，改為推薦 `extendWithFsExtraApi(fs)` 方式
2. **更新 index.ts 的 JSDoc 註解** - 修正函式說明中的錯誤範例，使用正確的使用模式
3. **強化函式說明文件** - 清楚區分 `extendWithFsExtraApi`（推薦）與 `extendWithFsExtraApiFromVolume`（特定用途）的使用情境
4. **添加使用警告** - 在錯誤範例旁邊添加說明，提醒開發者避免常見錯誤

## Capabilities

### New Capabilities

- 此變更不引入新功能，而是修正現有文件和範例的正確性

### Modified Capabilities

- 現有 `extendWithFsExtraApi` 函式的說明文件需要更新範例和註解

## Impact

- `README.md` - 主要影響檔案，包含安裝說明和 API 使用範例
- `src/index.ts` - 主要影響檔案，包含所有匯出的函式及其 JSDoc 註解