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
npm test / npm run test:watch            # Jest (jest-expo preset)
npx jest src/__tests__/screens/login.test.tsx   # single test file
npx jest -t "displays the expected screen heading"   # single test by name
npm run typegen                           # generate gitignored uniwind-types.d.ts + expo-env.d.ts (needed before typecheck on a clean install)
npm run typecheck                         # tsc --noEmit
npm run check / npm run check:fix         # Biome lint + format + import sort (check is what CI runs)
npm run lint / npm run lint:fix / npm run format   # Biome lint-only / format-only
```

Git hooks (Husky): pre-commit runs `lint-staged` (Biome check --write); pre-push runs typecheck and tests. CI (`.github/workflows/test.yml`) runs `npm run check`, `npm run typegen`, `npm run typecheck` and `npm test` on PRs.

Biome formatting: tabs, double quotes, import organizing enabled (`check:fix` sorts imports). Biome covers the whole repo except `assets/` and gitignored files (including root config files and Markdown).

## Environment

`.env` must define `EXPO_PUBLIC_APPWRITE_ENDPOINT`, `EXPO_PUBLIC_APPWRITE_PLATFORM`, `EXPO_PUBLIC_APPWRITE_PROJECT_ID`, `EXPO_PUBLIC_DATABASE_ID`, `EXPO_PUBLIC_BIRDS_TABLE_ID`, `EXPO_PUBLIC_SIGHTINGS_TABLE_ID`. They are read once in `src/constants/config.ts` (`CONFIG`). Don't read `process.env` anywhere else.

## Architecture

The import alias is `@/*` → `src/*`. All file names outside `src/app/` are kebab-case (e.g. `themed-text.tsx`, `use-auth.ts`); the exported symbols keep their PascalCase or camelCase names.

**Routing (expo-router, `src/app/`)**
- `_layout.tsx` sets up the providers: `QueryClientProvider` → `AuthProvider` → `RootNavigator`. It also imports `lib/query-lifecycle` (wires TanStack Query's online and focus managers to expo-network and AppState) and sets the Uniwind theme to system.
- `components/navigators/root-navigator.tsx` gates routes with `Stack.Protected`: `(auth)` (login/register) only when logged out, and `(app)` only when logged in. `app/index.tsx` redirects after `isAuthChecked`.
- `(app)/(tabs)/` has four tabs (new-sighting, sightings, birds, account), each with its own Stack `_layout.tsx`. List screens are `index.tsx` and detail screens are `[id].tsx`.

**Auth:** `context/auth-context.tsx` holds user/session state and the `login`/`register`/`logout` calls against Appwrite `account`. Consume it with `useAuth` from `hooks/use-auth.ts`.

**Data flow**
- `lib/appwrite.ts` exports the singleton `client`, `account` and `tablesDB`.
- `constants/tables.ts` exports `TABLES`, one config per table typed `{ [K in TableName]: TableConfig<K> }`: `tableId` (from `CONFIG`), `userScoped`, `select` (Appwrite `Query.select` fields, e.g. `["*", "bird.*"]` to expand the sighting→bird relation), and two row mappers, `listItem` (`href` + `label`) and `details` (`headingText` + `descriptionList`). Each mapper's `row` is typed by `RowFor[K]`.
- `services/api/` has thin Appwrite wrappers: `list.ts` (`getListData(table)`), `details.ts` (`getDetailsData({ table, rowId })`) and `mutate.ts` (`createSighting`, which sets per-user row permissions). The read functions are generic over the table (`<T extends TableName>`), take the table id and select fields from `TABLES[table]`, and return typed `RowFor[T]` rows. Each one catches and rethrows `new Error(getErrorMessage(e))`, so the UI only ever shows a user-friendly `error.message`.
- `services/errors/get-error-message.ts` (`getErrorMessage`) maps an `AppwriteException.type` to a message through `appwriteErrorMessage` in `constants/messages.ts`. All user-facing strings live in `constants/messages.ts`: `ERROR_MESSAGES` (errors and validation) and `DISPLAY_MESSAGES` (fallback display text such as `UNKNOWN_BIRD`, `NO_DESCRIPTION`).
- `types/db.ts` defines the row models (`Bird`, `Sighting`), the `RowFor` table→row map and `TableName` (`keyof RowFor`). Generic data components take a `table: T extends TableName` prop and read everything table-specific from `TABLES`:
  - `components/list/list.tsx` takes an optional `userId` prop (required for user-scoped tables like sightings), runs `useQuery` with `queryKeys.list`, and renders a FlatList of `ListItem`, which renders `TABLES[table].listItem(row)`.
  - `components/details/details.tsx` takes `rowId` (and an optional `userId`) as props, runs `useQuery` with `queryKeys.detail`, and renders `TABLES[table].details(row)`. The `[id].tsx` screens read `id` from `useLocalSearchParams` and throw `ERROR_MESSAGES.INVALID_ROUTE_PARAM` if it isn't a string. User-scoped screens throw `ERROR_MESSAGES.AUTH_ERROR` when there's no user.
  - To add a table, add its env var to `CONFIG`, its row model and `RowFor` entry in `types/db.ts`, and its entry in `TABLES` (TypeScript errors until every `TableName` has one).
- Build query keys with the factory in `lib/query-keys.ts`; don't write them inline. `queryKeys.all({ table, userId })` is `[table, userId]` when `TABLES[table].userScoped`, otherwise `[table]` (any `userId` is ignored). `list` appends `"list"`, and `detail` appends `"detail", rowId`. `sighting-form.tsx` invalidates only `queryKeys.list` after a create; invalidating `queryKeys.all` clears a table's list and details together.
- The QueryClient (`lib/query-client.ts`) default `staleTime` is 1 day.

**Forms:** `components/forms/` (`auth-form.tsx`, `sighting-form.tsx`) use Formik with Yup schemas in `services/validation/` (`auth.ts`, `sighting.ts`). Form value and mutation types are in `types/forms.ts`. Reusable themed UI primitives are in `components/ui/` (`ThemedText`, `ThemedButton`, `ThemedTextInput`, `ThemedSafeView`). Theme color tokens (`background`, `foreground`, `border`) are defined for light and dark in `src/global.css`.

**Current state:** in `services/api/mutate.ts`, `createSighting` still uses a hardcoded test `birdId`. The form's `commonName` field isn't yet resolved to a bird row.

## Testing

Tests live in `src/__tests__/{components,constants,context,lib,screens,services}`, mirroring `src/` with kebab-case names. Support files live in `src/test/`, outside `__tests__/`, because Jest treats every file under `__tests__/` as a suite. `src/test/setup.ts` globally mocks:
- `react-native-appwrite` (Client, Account, TablesDB, ID, AppwriteException)
- `uniwind`

It also silences `console.error` and calls `jest.clearAllMocks()` before each test.

TanStack Query is not mocked. Anything that uses `useQuery`, `useMutation` or `useQueryClient` (including `AuthProvider`) is rendered with `renderWithClient(ui, queryClient?)` from `src/test/query-client.tsx`. It wraps the UI in a fresh `createTestQueryClient()` (retries off, `gcTime: Infinity` so Jest exits cleanly) and returns `queryClient` with the render result. For `renderRouter`, pass `{ wrapper: createQueryWrapper(createTestQueryClient()) }`. Tests control data by mocking the `services/api` modules (`jest.mock("@/services/api/list")`, then `jest.mocked(getListData).mockResolvedValue(...)`). Use a never-resolving promise for loading states and `mockRejectedValue(new Error(...))` for error states. Assert cache keys with `queryClient.getQueryData(key)`. Static test data is in `src/test/fixtures.ts`, and Appwrite rows/lists, `MOCK_USER` and `MOCK_DEFAULT_AUTH_CONTEXT` are in `src/test/mocks.ts`. Auth-dependent components are tested by mocking `useAuth` (`jest.mock("@/hooks/use-auth", ...)`). With `@testing-library/react-native` v14, `render` is awaited (`await render(...)`).
