## ADDED Requirements

### Requirement: pathExists can check if path exists
The system SHALL return true if the path exists in the filesystem, false otherwise.

#### Scenario: Path exists
- **WHEN** checking a path that exists in the filesystem
- **THEN** system returns true

#### Scenario: Path does not exist
- **WHEN** checking a path that does not exist
- **THEN** system returns false

### Requirement: pathExistsSync can synchronously check if path exists
The system SHALL synchronously return true if the path exists in the filesystem, false otherwise.

#### Scenario: Path exists (sync)
- **WHEN** synchronously checking a path that exists
- **THEN** system returns true

#### Scenario: Path does not exist (sync)
- **WHEN** synchronously checking a path that does not exist
- **THEN** system returns false