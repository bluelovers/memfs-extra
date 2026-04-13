## ADDED Requirements

### Requirement: mkdtempDisposableSync creates disposable temporary directory
The system SHALL create a temporary directory that can be automatically disposed using Symbol.dispose.

#### Scenario: Create temp directory
- **WHEN** calling mkdtempDisposableSync with prefix
- **THEN** system creates temp directory with prefix

#### Scenario: Use dispose method
- **WHEN** calling dispose on returned disposable
- **THEN** system removes the temporary directory

#### Scenario: Use Symbol.dispose
- **WHEN** using automatic disposal (using block)
- **THEN** system removes directory after block

### Requirement: statfsSync returns filesystem statistics
The system SHALL return filesystem statistics for the specified path.

#### Scenario: Get statfs when supported
- **WHEN** calling statfsSync and native statfsSync exists
- **THEN** system returns native filesystem statistics

#### Scenario: Get statfs when not supported (memfs fallback)
- **WHEN** calling statfsSync and native statfsSync does not exist
- **THEN** system returns mock statistics object

#### Scenario: Verify statfs properties
- **WHEN** calling statfsSync
- **THEN** system returns object with type, bsize, blocks, bfree, bavail, files, ffree properties