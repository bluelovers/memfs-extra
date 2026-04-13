## ADDED Requirements

### Requirement: copy can copy file or directory
The system SHALL copy a file or directory from source to destination.

#### Scenario: Copy file
- **WHEN** calling copy with source file to destination
- **THEN** system copies file to destination

#### Scenario: Copy directory
- **WHEN** calling copy with source directory to destination
- **THEN** system copies directory and all contents

#### Scenario: Copy with overwrite: false
- **WHEN** calling copy with overwrite: false and destination exists
- **THEN** system uses COPYFILE_EXCL flag

### Requirement: copySync can synchronously copy file or directory
The system SHALL synchronously copy a file or directory.

#### Scenario: Copy file (sync)
- **WHEN** calling copySync with source file
- **THEN** system copies file synchronously

#### Scenario: Copy directory (sync)
- **WHEN** calling copySync with source directory
- **THEN** system copies directory synchronously

### Requirement: cpSync can copy using native or fallback
The system SHALL copy using native fs.cpSync if available, otherwise use copySync.

#### Scenario: cpSync with native copy
- **WHEN** calling cpSync and native cpSync exists
- **THEN** system uses native cpSync

#### Scenario: cpSync fallback
- **WHEN** calling cpSync and native cpSync does not exist
- **THEN** system falls back to copySync