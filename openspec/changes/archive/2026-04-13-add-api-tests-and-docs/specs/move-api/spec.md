## ADDED Requirements

### Requirement: move can move file or directory
The system SHALL move (rename) a file or directory from source to destination.

#### Scenario: Move file
- **WHEN** calling move with source file to new destination
- **THEN** system moves file to destination

#### Scenario: Move directory
- **WHEN** calling move with source directory to new destination
- **THEN** system moves directory with contents

#### Scenario: Move with overwrite option
- **WHEN** calling move with overwrite: false and destination exists
- **THEN** system throws error if errorOnExist is true, otherwise does nothing

### Requirement: moveSync can synchronously move file or directory
The system SHALL synchronously move (rename) a file or directory.

#### Scenario: Move file (sync)
- **WHEN** calling moveSync with source file to destination
- **THEN** system moves file synchronously

#### Scenario: Move directory (sync)
- **WHEN** calling moveSync with source directory to destination
- **THEN** system moves directory synchronously

#### Scenario: Move with overwrite option (sync)
- **WHEN** calling moveSync with overwrite: false
- **THEN** system behaves same as async version