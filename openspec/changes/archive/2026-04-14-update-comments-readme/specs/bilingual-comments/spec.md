## ADDED Requirements

### Requirement: All exported functions SHALL have bilingual JSDoc comments
All functions exported from the main entry point SHALL include JSDoc comments in Traditional Chinese + English format.

#### Scenario: Main entry functions documented
- **WHEN** a developer views TypeScript IntelliSense for `extendWithFsExtraApi`
- **THEN** they see Chinese description followed by English description

#### Scenario: Main entry functions documented
- **WHEN** a developer views TypeScript IntelliSense for `getVolumeFromFs`
- **THEN** they see Chinese description followed by English description

### Requirement: All TypeScript types and interfaces SHALL have bilingual comments
All type definitions, interfaces, and type aliases SHALL include block comments.

#### Scenario: Type definitions documented
- **WHEN** a developer hovers over `IFakeFsExtra` type
- **THEN** they see the type description in Chinese and English

### Requirement: README SHALL contain complete installation and API documentation
The README file SHALL include all necessary installation commands and API reference.

#### Scenario: Installation commands complete
- **WHEN** a new developer reads the README
- **THEN** they see pnpm, yarn, and npm installation commands

#### Scenario: API list comprehensive
- **WHEN** a developer searches for a function in README
- **THEN** they find the function with description and link to source