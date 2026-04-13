## Context

memfs-extra 是一個為 memfs 提供 fs-extra 風格 API 的程式碼庫。目前：
- 只有一個主要原始碼檔案 `index.ts`（322 行）
- 包含 56+ 個 API（19 async、19 sync、18 aliases）
- 缺乏測試覆蓋與雙語註解
- README 可能過時或缺失關鍵資訊

本專案目標：
- 為所有導出 API 添加完整測試
- 添加符合規範的雙語註解
- 提供完整的文件讓開發者能快速上手

## Goals / Non-Goals

**Goals:**
- 為所有 56+ 個 API 添加測試覆蓋
- 將測試拆分為 12 個功能類別的測試檔案
- 為所有導出函式添加雙語區塊註解
- 更新 README 包含安裝、使用、API 清單

**Non-Goals:**
- 不添加非導出的內部函式測試
- 不修改核心邏輯（除非發現 bug）
- 不添加整合測試（僅單元測試）

## Decisions

1. **測試拆分策略**: 按功能類別拆分而非按Async/Sync拆分
   - 每個功能類別一個測試檔案（包含該類別所有 async、sync、alias）
   - 優點：相關測試集中，維護性高

2. **註解語言**: 雙語（繁體中文 + 英文）
   - 遵循現有的 OpenCode 註解格式規範
   - 中文在前，英文在後，使用 `/` 分隔

3. **測試框架**: 使用專案現有的測試框架
   - 從現有測試推斷使用的框架（Jest）

## Risks / Trade-offs

[Risk] API 數量眾多（50+）需要大量測試撰寫
→ Mitigation: 按類別拆分，逐步實現

[Risk] 部分 API 行為可能依賴外部狀態（如 memfs）
→ Mitigation: 每個測試使用 fresh 的 memfs instance