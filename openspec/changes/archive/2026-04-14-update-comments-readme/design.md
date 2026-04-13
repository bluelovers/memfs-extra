## Context

`memfs-extra` 是一個為 `memfs` 提供 `fs-extra` API 擴展的 Node.js 函式庫。目前專案存在以下問題：

1. **缺少雙語註解**：大多數函式沒有 JSDoc 註解，影響 TypeScript IntelliSense 與開發者體驗
2. **README 部分過時**：API 清單不完整，範例有限
3. **無統一的程式碼風格**：部分函式有註解但格式不一致

## Goals / Non-Goals

**Goals:**
- 為所有主要匯出函式添加完整的雙語 JSDoc 註解
- 為所有 TypeScript 型別與介面添加區塊註解
- 更新 README.md 補齊安裝指令與 API 說明
- 確保向後完全相容（零破壞性變更）

**Non-Goals:**
- 不修改任何函式邏輯或行為
- 不新增 API 或功能
- 不改變現有的匯出結構

## Decisions

### 1. 註解格式採用雙語格式（中文 + 英文）

**選擇原因**：
- 專案為台灣開發者維護，需要中文說明
- 英文翻譯確保國際開發者能理解
- 符合 OpenCode 平台的程式碼風格規範

**實施方式**：
```typescript
/**
 * 函式用途說明
 * Function purpose description
 *
 * @param paramName - 參數說明 / Parameter description
 * @returns 回傳值說明 / Return value description
 */
```

### 2. 優先處理主要匯出模組

**順序**：
1. `index.ts` - 主要入口與核心函式
2. `fs-extra.ts` - fs-extra API 實現
3. `unionfs.ts` - unionfs 整合

**理由**：主要模組覆蓋 80% 的使用場景，先處理可快速提升開發體驗。不處理 `.d.ts` 檔案（自動生成）。

### 3. README 更新策略

- 保留現有的雙語格式
- 補齊每個 API 的 JSDoc 連結
- 添加更多實際使用範例

## Risks / Trade-offs

### 風險 1：過度註解

**描述**：為簡單函式添加過長註解可能降低可讀性。

**緩解**：
- 僅為公開 API（匯出的函式）添加註解
- 內部輔助函式保持簡單
- 遵循「解釋 WHY，非解釋 WHAT」原則

### 風險 2：註解與實際行為脫節

**描述**：若函式行為變更但忘記更新註解，會誤導開發者。

**緩解**：
- 建立 TODO 標記追蹤待驗證的行為
- 保持註解精簡，只描述確定的事項

### 風險 3：破壞現有功能

**描述**：修改註解不應影響執行，但可能影響類型推導。

**緩解**：
- 不修改函式簽章
- 不改變類型定義
- 僅添加/修正 JSDoc 描述
- 完成後執行測試確認無破壞