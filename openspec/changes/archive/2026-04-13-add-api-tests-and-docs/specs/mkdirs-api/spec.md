## ADDED Requirements

### Requirement: mkdirs can create directory recursively
The system SHALL create a directory and all parent directories recursively.

#### Scenario: Create nested directory
- **WHEN** calling mkdirs with nested path
- **THEN** system creates directory and all parent directories

### Requirement: mkdirsSync can synchronously create directory recursively
The system SHALL synchronously create a directory and all parent directories.

#### Scenario: Create nested directory (sync)
- **WHEN** calling mkdirsSync with nested path
- **THEN** system creates directory synchronously

### Requirement: mkdirp aliases mkdirs
The system SHALL have mkdirp as an alias for mkdirs.

#### Scenario: mkdirp creates directory
- **WHEN** calling mkdirp with path
- **THEN** system behaves the same as mkdirs

### Requirement: ensureDir aliases mkdirs
The system SHALL have ensureDir as an alias for mkdirs.

#### Scenario: ensureDir creates directory
- **WHEN** calling ensureDir with path
- **THEN** system behaves the same as mkdirs