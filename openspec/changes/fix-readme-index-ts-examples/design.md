## Context

目前專案中的 README.md 和 index.ts 包含不正確的 API 使用範例。許多開發者（包括 AI Agent）可能會錯誤地使用以下模式：

```typescript
// ❌ 錯誤範例（目前存在的）
const vol = new Volume();
const fs = extendWithFsExtraApi(vol);
```

正確的方式應該是使用 `memfs` 套件提供的 `fs` 物件：

```typescript
// ✅ 正確範例（應該有的）
import { fs, Volume, vol } from 'memfs';

const fse = extendWithFsExtraApi(fs); // 推薦使用 fs
const fse2 = extendWithFsExtraApiFromVolume(vol); // 使用 Volume 实例
```

雖然已有 `extendWithFsExtraApiFromVolume` 函式可用，但缺乏清晰的說明文件和正確範例，開發者仍可能沿用錯誤模式。

## Goals / Non-Goals

**Goals:**
- 修正 README.md 中的所有錯誤 API 使用範例
- 修正 index.ts 中的 JSDoc 註解範例
- 提供清楚的使用說明，區分推薦方式與特定用途方式

**Non-Goals:**
- 不修改任何函式實作邏輯
- 不改變現有的 API 簽章

## Decisions

### D1: 使用 `extendWithFsExtraApi(fs)` 作為推薦方式

**Rationale:** 
- `fs` 物件已經是完整的檔案系統實作，直接傳入可確保 API 正確扩展
- 這是 `memfs` 套件設計的使用方式，与官方範例一致

**Alternatives Considered:**
- `extendWithFsExtraApiFromVolume(vol)` - 適用於需要自定義 Volume 實例的特定用途

### D2: 在錯誤範例旁邊添加使用警告

**Rationale:**
- 直接在錯誤範例旁標記「請勿使用」，可有效防止開發者複製錯誤代碼

## Risks / Trade-offs

**[Risk]** 部分開發者可能已習慣錯誤語法
- **Mitigation:** 在升級日誌或遷移文件中說明修正原因

**[Risk]** 文件更新可能對已存在的翻譯造成影響
- **Mitigation:** 僅修正英文範例和技術性說明，不涉及其它翻譯