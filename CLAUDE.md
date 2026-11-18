# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

My Birdiary is an Expo (SDK 58, React Native 0.88, React 19) app for logging bird sightings. The backend is Appwrite (auth plus a TablesDB database with `birds` and `sightings` tables). Styling uses Tailwind v4 through **Uniwind** (`className` on RN components).

The project will be the native version of the web app Birdiary at https://mybirdiary.com.

### MVP 1

The current project state represents the end goal of MVP #1:

- Basic email/password authentication
- Birdpedia page with list of birds, each linking to a bird details page (currently using dummy data).
- Protected sightings page with list of user's sightings, each linking to a sighting details page.
- Basic form creates new sighting with name, date, and description.
  - API intentionally submits a hardcoded `birdId` value.

No further features are planned for MVP #1.

## Commands

```sh
npm start / npm run ios / npm run android / npm run web   # Expo dev server (ios enables Rozenite devtools via WITH_ROZENITE=true)
npm test                                  # Jest (jest-expo preset)
npx jest src/__tests__/screens/login.test.tsx   # single test file
npx jest -t "displays the expected screen heading"   # single test by name
npm run typecheck                         # tsc --noEmit
npm run check / npm run check:fix         # Biome lint + format check on ./src (what CI runs)
```

Git hooks (Husky): pre-commit runs `lint-staged` (Biome check --write); pre-push runs typecheck and tests. CI (`.github/workflows/test.yml`) runs `npm run check` and `npm test` on PRs.

Biome formatting: tabs, double quotes, import organizing disabled. Biome only covers `./src`.

## Environment

`.env` must define `EXPO_PUBLIC_APPWRITE_ENDPOINT`, `EXPO_PUBLIC_APPWRITE_PLATFORM`, `EXPO_PUBLIC_APPWRITE_PROJECT_ID`, `EXPO_PUBLIC_DATABASE_ID`, `EXPO_PUBLIC_BIRDS_TABLE_ID`, `EXPO_PUBLIC_SIGHTINGS_TABLE_ID`. They are read once in `src/constants/config.ts` (`CONFIG`, `APPWRITE_TABLE_IDS`). Don't read `process.env` anywhere else.

## Architecture

The import alias is `@/*` → `src/*`.

**Routing (expo-router, `src/app/`)**
- `_layout.tsx` sets up the providers: `QueryClientProvider` → `AuthProvider` → `RootNavigator`. It also imports `lib/query-lifecycle` (wires TanStack Query's online and focus managers to expo-network and AppState) and sets the Uniwind theme to system.
- `components/navigators/RootNavigator.tsx` gates routes with `Stack.Protected`: `(auth)` (login/register) only when logged out, and `(app)` only when logged in. `app/index.tsx` redirects after `isAuthChecked`.
- `(app)/(tabs)/` has four tabs (new-sighting, sightings, birds, account), each with its own Stack `_layout.tsx`. List screens are `index.tsx` and detail screens are `[id].tsx`.

**Auth:** `context/AuthContext.tsx` holds user/session state and the `login`/`register`/`logout` calls against Appwrite `account`. Consume it with `hooks/useAuth`.

**Data flow**
- `lib/appwrite.ts` exports the singleton `client`, `account` and `tablesDB`.
- `services/api/` has thin Appwrite wrappers: `list.ts` (`getListData`), `details.ts` (`getDetailsData`) and `mutate.ts` (`createSighting`, which sets per-user row permissions). Each one catches and rethrows `new Error(getErrorMessage(e))`, so the UI only ever shows a user-friendly `error.message`.
- `services/errors/error-messages.ts` maps an `AppwriteException.type` to a message through `appwriteErrorMessage` in `constants/messages.ts`. All user-facing strings, including validation messages, live in `ERROR_MESSAGES`.
- Generic screen components are keyed by the `DbTables` type (`"birds" | "sightings"`):
  - `components/screens/List.tsx` runs `useQuery` with `queryKey: [table]` and renders a FlatList of `ListItem`.
  - `components/screens/Details.tsx` reads `id` from `useLocalSearchParams` and runs `useQuery` with `[table, id]`. `features/getDetailsScreenText.ts` turns a row into a heading and a `DescriptionList` for each table.
  - To add a table, extend `DbTables`, `APPWRITE_TABLE_IDS`, the models in `types/db.ts`, and the switch in `getDetailsScreenText`.
  - Screens pass Appwrite `Query.select` fields (e.g. `["*", "bird.*"]` to expand the sighting→bird relation).
- The QueryClient default `staleTime` is 1 day.

**Forms:** Formik with Yup schemas in `services/validation/` (`auth.ts`, `sighting.ts`). Form value and mutation types are in `types/forms.ts`. Reusable themed UI primitives are in `components/ui/` (`ThemedText`, `ThemedButton`, `ThemedTextInput`, `ThemedSafeView`). Theme color tokens (`background`, `foreground`, `border`) are defined for light and dark in `src/global.css`.

**Current state:** in `services/api/mutate.ts`, `createSighting` still uses a hardcoded test `birdId`. The form's `commonName` field isn't yet resolved to a bird row.

## Testing

Tests live in `src/__tests__/{components,screens,context,features}`. `jest.setup.ts` globally mocks:
- `react-native-appwrite` (Client, Account, TablesDB, ID, AppwriteException)
- `uniwind`
- `@tanstack/react-query`: only `useQuery` and `useMutation` are mocked, so there's no real QueryClient in tests

It also silences `console.error` and calls `jest.clearAllMocks()` before each test.

Tests drive components by mocking the hooks directly, e.g. `jest.mocked(useQuery).mockReturnValue({...defaultListReturnValue} as ReturnType<typeof useQuery>)`. Shared fixtures and default hook return values are in `src/test/mockData.ts`, with their types in `src/test/types.ts`. Auth-dependent components are tested by mocking `useAuth` or providing `mockAuthContext`. With `@testing-library/react-native` v14, `render` is awaited (`await render(...)`).
