## ADDED Requirements

### Requirement: ensureLink can create hard link
The system SHALL create a hard link from source to destination, creating parent directories if needed.

#### Scenario: Create new hard link
- **WHEN** calling ensureLink with valid source and destination
- **THEN** system creates hard link

#### Scenario: Link already exists
- **WHEN** calling ensureLink when link already exists
- **THEN** system does nothing (no error)

#### Scenario: Create link with auto-created parent
- **WHEN** calling ensureLink to path with non-existent parent
- **THEN** system creates parent directories then creates link

### Requirement: ensureLinkSync can synchronously create hard link
The system SHALL synchronously create a hard link.

#### Scenario: Create hard link (sync)
- **WHEN** calling ensureLinkSync with valid paths
- **THEN** system creates hard link synchronously

#### Scenario: Link already exists (sync)
- **WHEN** calling ensureLinkSync when link exists
- **THEN** system does nothing synchronously

### Requirement: createLink aliases ensureLink
The system SHALL have createLink as an alias for ensureLink.

#### Scenario: createLink behaves same as ensureLink
- **WHEN** calling createLink with paths
- **THEN** system behaves the same as ensureLink