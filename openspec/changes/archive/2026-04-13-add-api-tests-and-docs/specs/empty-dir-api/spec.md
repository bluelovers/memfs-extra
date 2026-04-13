## ADDED Requirements

### Requirement: emptyDir can empty a directory
The system SHALL remove all contents of a directory while keeping the directory itself.

#### Scenario: Empty directory with contents
- **WHEN** calling emptyDir on a directory with files
- **THEN** system removes all files but keeps the directory

#### Scenario: Empty non-existent directory
- **WHEN** calling emptyDir on a directory that does not exist
- **THEN** system creates the directory

### Requirement: emptyDirSync can synchronously empty a directory
The system SHALL synchronously remove all contents.

#### Scenario: Empty directory (sync)
- **WHEN** calling emptyDirSync on a directory with files
- **THEN** system removes all files synchronously, keeps directory

#### Scenario: Empty non-existent directory (sync)
- **WHEN** calling emptyDirSync on a non-existent directory
- **THEN** system creates the directory synchronously

### Requirement: emptydir aliases emptyDir
The system SHALL have emptydir as an alias for emptyDir.

#### Scenario: emptydir behaves same as emptyDir
- **WHEN** calling emptydir with path
- **THEN** system behaves the same as emptyDir