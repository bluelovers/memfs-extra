# Jest Mocking `fs` with `memfs-extra`

本文說明了如何在 Jest 測試環境中使用 `memfs-extra` 模擬 Node.js 的 `fs` 模組。這裡介紹了兩种主要的方法。

This document explains how to mock the Node.js `fs` module using `memfs-extra` in a Jest testing environment. Two main methods are introduced here.

---

## 1. Share Mock (共享模擬)

### 說明 / Description
此方法透過在 `__mocks__` 資料夾中建立模擬檔案來實現。這是一種全域性的模擬方式，適合於整個專案多個測試檔案都需要模擬 `fs` 的情況。

This method is implemented by creating a mock file in the `__mocks__` folder. It is a global mocking approach suitable for scenarios where multiple test files across the project need to mock `fs`.

### 實作方式 / Implementation
1. 建立檔案 `test/__mocks__/fs.js` (注意：必須是 `.js` 副檔名才有效)。
   Create the file `test/__mocks__/fs.js` (Note: It must have a `.js` extension to work).
2. 在該檔案中導出 `memfs-extra/fs-extra`。
   Export `memfs-extra/fs-extra` in that file.

```javascript
// test/__mocks__/fs.js
module.exports = require('memfs-extra/fs-extra');
```

3. 在測試檔案中呼叫 `jest.mock('fs')`。
   Call `jest.mock('fs')` in your test file.

```typescript
// test/jest-mock/jest-mock-share.spec.ts
import fs from 'fs';
jest.mock('fs');

describe('jest mock fs (share)', () => {
    it('should have fs.readJSON', () => {
        expect(fs).toHaveProperty('readJSON');
    });
});
```

### 優點與狀況 / Pros and Scenarios
- **優點 (Pros):** 設定一次即可在多處使用，程式碼簡潔。
- **狀況 (Scenarios):** 當你的專案幾乎所有測試都需要使用虛擬檔案系統時。

- Easy to reuse across multiple tests once configured; keeps test code clean.
- When almost all tests in your project require a virtual file system.

---

## 2. Inline Mock (行內模擬)

### 說明 / Description
此方法在個別測試檔案中直接定義模擬行為。它提供了更高的靈活性，允許你針對特定測試檔案自定義模擬內容。

This method defines the mock behavior directly within individual test files. It provides higher flexibility, allowing you to customize the mock for specific test files.

### 實作方式 / Implementation
直接在測試檔案的頂部使用 `jest.mock` 並提供工廠函式。

Use `jest.mock` directly at the top of the test file and provide a factory function.

```typescript
// test/jest-mock/jest-mock-inline.spec.ts
import fs from 'fs';

jest.mock('fs', () => {
    return require('memfs-extra/fs-extra');
});

jest.mock('fs/promises', () => {
    return require('memfs-extra/fs-extra').promises;
});

describe('jest mock fs (inline)', () => {
    it('should have fs.readJSON', () => {
        expect(fs).toHaveProperty('readJSON');
    });
});
```

### 優點與狀況 / Pros and Scenarios
- **優點 (Pros):** 靈活性高，不會影響到其他不需要模擬 `fs` 的測試檔案。可以同時模擬子模組（如 `fs/promises`）。
- **狀況 (Scenarios):** 當只有少數測試檔案需要模擬 `fs`，或者不同測試需要不同的模擬行為時。

- High flexibility; does not affect other test files that don't need to mock `fs`. Can easily mock submodules like `fs/promises`.
- When only a few test files need to mock `fs`, or when different tests require different mocking behaviors.

---

## 總結 / Summary

| 特性 (Feature) | Share Mock | Inline Mock |
| :--- | :--- | :--- |
| **定義位置 (Location)** | `__mocks__/fs.js` | 測試檔案內 (Inside test file) |
| **影響範圍 (Scope)** | 全域/多個檔案 (Global/Multiple files) | 單一檔案 (Single file) |
| **配置複雜度 (Complexity)** | 低 (一次性配置) / Low (One-time) | 中 (每個檔案需寫一次) / Medium (Per file) |
| **靈活性 (Flexibility)** | 低 / Low | 高 / High |

在使用 `memfs-extra` 時，這兩種方法都能讓你輕鬆地將真實的 `fs` 替換為具有 `fs-extra` 擴充功能的記憶體檔案系統。

When using `memfs-extra`, both methods allow you to easily replace the real `fs` with an in-memory file system that includes `fs-extra` extensions.
