# Project Context: nest-geo-info-service

## Overview
`nest-geo-info-service` is a NestJS-based backend service designed to provide geographical information. It appears to be structured around managing location data such as countries, departments, cities, and neighborhoods.

## Technology Stack
- **Framework:** [NestJS](https://nestjs.com/) (v11)
- **Language:** TypeScript
- **Runtime:** Node.js
- **Database/Backend:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **API Documentation:** Swagger (`@nestjs/swagger`)
- **Validation:** `class-validator`, `class-transformer`
- **Package Manager:** `bun` (as the primary package manager)

## Project Structure
The project follows a standard NestJS modular architecture.

### Root Directory
- `package.json`: Defines dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `.env`: Environment variables (not committed).
- `src/`: Source code.
- `test/`: E2E tests.

### Source Directory (`src/`)
The application is divided into feature modules:

- **Core Modules:**
    - `app.module.ts`: The root module of the application.
    - `main.ts`: The entry point of the application.

- **Feature Modules:**
    - `api-key/`: Likely handles API key management and validation.
    - `auth/`: Authentication logic.
    - `country/`: Management of country data.
    - `department/`: Management of department/state data.
    - `city/`: Management of city data.
    - `neighborhood/`: Management of neighborhood data.

- **Infrastructure/Shared:**
    - `supabase/`: Supabase client integration.
    - `shared/`: Shared utilities, guards, interceptors, etc.

## Key Dependencies
- **@nestjs/common, @nestjs/core, @nestjs/platform-express:** Core NestJS framework.
- **@nestjs/config:** Configuration management.
- **@nestjs/swagger:** API documentation generation.
- **@supabase/supabase-js:** Client for interacting with Supabase.
- **class-validator, class-transformer:** DTO validation and transformation.

## Scripts
- `bun run start`: Start the application.
- `bun run start:dev`: Start the application in development mode.
- `bun run build`: Build the application.
- `bun run test`: Run unit tests.
- `bun run test:e2e`: Run end-to-end tests.
