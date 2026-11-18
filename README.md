# My Birdiary Native

## Project Description

**My Birdiary Native** is a user-friendly mobile application for birdwatchers to record their bird sightings. Birders will be able to pick from more than 800 North American bird species and add a date and notes for each sighting.

My Birdiary Native is the mobile-only version of the web application Birdiary at https://mybirdiary.com.

The application is intended for birding enthusiasts looking for a user-friendly application they can use anywhere, including in the field, to record, store, and track their birding diary and life lists.

## Status

The application is still in early development, with the first milestone (MVP #1) in cleanup mode.

### MVP 1 Features

- User authentication
- Birdpedia and bird details screens (placeholder data)
- Sightings and sighting details screens (placeholder data)
- Create a new sighting with user-specific read, update, delete permissions

### Limitations and stubs

- Placeholder bird data
- Placeholder sightings data
- New sighting form incomplete
  - sends hardcoded bird id to db only
  - no location data
- Authentication is incomplete
  - verify email
  - forgot password
  - password requirements
  - disposable email security checks

See the [Roadmap section](#roadmap) for more info

## Tech stack

- TypeScript v6
- Expo SDK v58
- React Native v0.88
- React v19
- Expo Router
- Appwrite
- TanStack Query
- Tailwind, Uniwind
- Formik, Yup
- Jest
- Biome
- Luxon

## Prerequisites

- Node 22.22.1+, 24.3+, or 26.x
  - Current development version: 24.22.1
- npm 10+
- Xcode with iOS Simulator and/or Android Studio
- Appwrite (see [Backend Setup](#backend-setup))

## Getting started

1. Clone the [`mybirdiary-native` repository](https://github.com/tdkent/mybirdiary-native)
2. `npm install`
3. Create a `.env` file from `.env.example` (see [Backend Setup](#backend-setup))
4. Run the application. Use `npm run ios` to open the app in iOS Simulator with Expo Go. Use `npm run android` to open the app on an Android device or emulator with Android Studio. Use `npm start` to see all options for running the application.
5. Successful first run should navigate the app to the login screen.

## Environment variables

```bash
# .env.example

# Appwrite client
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://<REGION>.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PLATFORM=com.mybirdiary.app
EXPO_PUBLIC_APPWRITE_PROJECT_ID=

# Appwrite database
EXPO_PUBLIC_DATABASE_ID=
EXPO_PUBLIC_BIRDS_TABLE_ID=
EXPO_PUBLIC_SIGHTINGS_TABLE_ID=
```

#### `EXPO_PUBLIC_APPWRITE_ENDPOINT`

> The region where the Appwrite services endpoint resides.

Appwrite console -> Projects -> Project Dashboard

#### `EXPO_PUBLIC_APPWRITE_PLATFORM`

> Bundle ID

Appwrite console -> Projects -> App

#### `EXPO_PUBLIC_APPWRITE_PROJECT_ID`

Appwrite console -> Projects -> Project Dashboard

#### `EXPO_PUBLIC_DATABASE_ID`

Appwrite console -> Projects -> Databases

#### `EXPO_PUBLIC_BIRDS_TABLE_ID`

> ID of the `birds` table

Appwrite console -> Projects -> Databases -> Database tables

#### `EXPO_PUBLIC_SIGHTINGS_TABLE_ID`

> ID of the `sightings` table

Appwrite console -> Projects -> Databases -> Database tables

> [!CAUTION]
> Variables in `.env` prefixed with `EXPO_PUBLIC` are included in the app bundle. Do NOT use `EXPO_PUBLIC_` for secrets!

## Backend Setup

The application uses [Appwrite backend-as-a-service](https://appwrite.io) for authentication and data persistence.

- Bundle ID: `com.mybirdiary.app`
- Package name: `mybirdiary-native`

### Authentication

The app uses [Appwrite's email and password login](https://appwrite.io/docs/products/auth/email-password) protocol.

### Database

Uses [Appwrite TablesDB](https://appwrite.io/docs/products/databases/tablesdb)

#### Tables

`birds`

- `$id`: auto-generated row id (string)
- `commonName`: common name of the bird species (varchar (64), required)
- `scientificName`: scientific name of the bird species (varchar (64), required)
- `description`: description of the bird (text, required)
- `$createdAt`: auto-generated when row is created (datetime)
- `$updatedAt`: auto-generated when row is updated (datetime)

`sightings`

- `$id`: auto-generated row id (string)
- `bird`: species of bird sighted (relationship)
  - `relationship type`: one-way
  - `related table`: `birds`
  - `column key`: `bird`
  - `relation`: many-to-one `sightings` -> `bird`
  - `on delete`: cascade
- `date`: date of sighting (datetime (64), required)
- `description`: description of sighting (varchar (150))
- `$createdAt`: auto-generated when row is created (datetime)
- `$updatedAt`: auto-generated when row is updated (datetime)

#### Permissions

- `birds`: Read permissions active for all authenticated users. Create, Update, and Delete are disallowed for all users.

- `sightings`: Create permissions active for all authenticated users. Row permissions lock Read, Update, and Delete permissions to the user who created the row.

## Scripts

### Run

#### `npm run android`

Runs the app in an Android device or emulator (requires Android Studio).

#### `npm run ios`

Opens the app in iOS Simulator. Includes `WITH_ROZENITE=true` in script to open the TanStack Query Dev Tools plugin from Rozenite in React Dev Tools.

#### `npm start`

Runs `npx expo start` to start up application with options to run in Expo Go or a simulator.

### Quality

#### `npm run check`

Runs the Biome `check` command to run linter and formatter. Checks for issues, does not fix.

#### `npm run check:fix`

Runs Biome `check` and attempts to fix issues.

#### `npm run format`

Runs Biome formatter and fixes issues.

#### `npm run lint`

Runs Biome linter. Checks for issues, does not fix.

#### `npm run lint:fix`

Runs Biome linter and attempts to fix issues.

#### `npm run prepare`

Runs automatically on `npm install`. Installs Husky git hooks.

#### `npm run typecheck`

Type checker that runs TypeScript compiler `tsc` with `--noEmit` flag.

## Testing

Tests use Jest with the `jest-expo` preset and React Native Testing Library.

### Where tests live

| Folder                      | What it covers                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `src/__tests__/components/` | Forms, generic `List` and `Details`, `DescriptionList`                                      |
| `src/__tests__/screens/`    | Each route screen                                                                           |
| `src/__tests__/context/`    | `AuthContext`                                                                               |
| `src/__tests__/features/`   | Error-message mapping                                                                       |
| `src/test/`                 | Shared fixtures and default hook return values (`mockData.ts`) and their types (`types.ts`) |

### Global mocks

`jest.setup.ts` mocks these modules for every test:

- `react-native-appwrite`: `Client`, `Account`, `TablesDB`, `ID` and `AppwriteException`, so no test reaches a real Appwrite backend
- `uniwind`
- `@tanstack/react-query`: only `useQuery` and `useMutation`, so tests have no real `QueryClient`

Before each test it also clears all mocks and silences `console.error`.

### Testing scripts

#### `npm run test`

Runs Jest once.

#### `npm run test:watch`

Runs Jest in watch mode.

## Quality and Workflow

The project uses Husky and GitHub Actions CI to check code quality. Pull requests are required when pushing code to the GitHub remote repo.

### Pre-commit

Husky runs Biome linter and formatter via `lint-staged` on each code commit. Errors stop the commit.

### Pre-push

On each push, Husky runs `npm run typecheck` to check the project for TypeScript build issues, then `npm run test` to run the entire test suite. Errors or failed scripts stop the push.

### GitHub Actions `test` workflow

The `test` workflow is continuous integration (CI) script that lints and tests an incoming branch PR before merging.

## Project structure

```text
src/
├── app/                 Expo Router screens and layouts
│   ├── (auth)/          login and register, logged-out only
│   └── (app)/(tabs)/    protected tabs: new-sighting, sightings, birds, account
├── components/
│   ├── forms/           AuthForm, SightingForm
│   ├── navigators/      RootNavigator with Stack.Protected
│   ├── screens/         generic List and Details
│   └── ui/              themed primitives
├── constants/           config, messages, dates, navigation
├── context/             AuthContext
├── features/            per-table details text
├── hooks/               useAuth
├── lib/                 Appwrite client, QueryClient
├── services/
│   ├── api/             Appwrite list, details, mutate
│   ├── errors/          Appwrite error to message
│   └── validation/      Yup schemas
├── types/               db, forms, ui
├── __tests__/           Jest tests
└── test/                mock data and types
```

See [CLAUDE.md](CLAUDE.md) for the architecture in more detail.

## Roadmap

### MVP 1

Currently in cleanup mode.

### MVP 2

Here is an incomplete list of features planned for MVP #2:

- Fully seed `birds` table
- Add bird images
- Add location data to a sighting
- Diary and life list screens
