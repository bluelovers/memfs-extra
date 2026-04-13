## MODIFIED Requirements

### Requirement: API 使用範例需使用正確的 extendWithFsExtraApi 語法

所有文件和程式碼中的 API 使用範例 SHALL 使用推薦的語法：`extendWithFsExtraApi(fs)`，而非 `extendWithFsExtraApi(volume)`。

#### Scenario: README.md 中的使用範例

- **WHEN** 開發者參考 README.md 中的程式碼範例
- **THEN** 範例 SHALL 使用 `extendWithFsExtraApi(fs)` 語法，例如：
  ```typescript
  import { fs } from 'memfs';
  const fse = extendWithFsExtraApi(fs);
  ```

#### Scenario: index.ts 中的 JSDoc 說明

- **WHEN** 開發者查看 index.ts 中函式的 JSDoc 文件
- **THEN** 範例 SHALL 使用正確的語法，並清楚說明 `extendWithFsExtraApiFromVolume` 的適用場景

#### Scenario: 錯誤範例的使用警告

- **WHEN** 文件中存在錯誤的 API 使用範例
- **THEN** 應該在錯誤範例旁添加說明（例如：`// 請勿使用此方式 / DO NOT use this pattern`），或直接移除錯誤範例

### Requirement: 區分 extendWithFsExtraApi 與 extendWithFsExtraApiFromVolume 的使用情境

文件 SHALL 清楚說明兩種函式的使用情境：

- `extendWithFsExtraApi(fs)` - 用於一般推薦場景，直接擴展 memfs 的 fs 物件
- `extendWithFsExtraApiFromVolume(vol)` - 用於需要自定義 Volume 實例的特定用途

#### Scenario: 一般使用場景

- **WHEN** 開發者需要使用 fs extra API
- **THEN** 文件 SHALL 建議使用 `extendWithFsExtraApi(fs)` 語法

#### Scenario: 特定用途場景

- **WHEN** 開發者需要使用自定義的 Volume 實例
- **THEN** 文件 SHALL 說明可以使用 `extendWithFsExtraApiFromVolume(vol)`