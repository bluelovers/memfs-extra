## ADDED Requirements

### Requirement: remove can remove file or directory
The system SHALL remove a file or directory (including all children) at the specified path.

#### Scenario: Remove file
- **WHEN** calling remove on a file
- **THEN** system removes the file

#### Scenario: Remove directory
- **WHEN** calling remove on a directory with content
- **THEN** system removes directory and all contents

### Requirement: removeSync can synchronously remove file or directory
The system SHALL synchronously remove a file or directory (including all children).

#### Scenario: Remove file (sync)
- **WHEN** calling removeSync on a file
- **THEN** system removes the file synchronously

#### Scenario: Remove directory (sync)
- **WHEN** calling removeSync on a directory with content
- **THEN** system removes directory and all contents synchronously