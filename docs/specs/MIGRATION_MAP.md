# Migration Map

Source project: `minha-saude-feminina mobile`
Destination project: `front_mobile`

This document starts the migration map required before implementation. Later
tasks will expand each section with detailed route, component, data, service,
API and asset mappings.

## Ground Rules

- The original React/Lovable project is read-only and remains the functional
  and visual source of truth.
- Implementation happens only inside the existing Expo project in
  `front_mobile`.
- Do not create another Expo project.
- Use `App.tsx` as the main entry point.
- Use React Navigation with screens in `src/pages`.
- Do not use Expo Router as the primary navigation model.
- Do not port HTML, DOM APIs, Tailwind CSS or Radix/shadcn components directly.
- Preserve business rules before visual polish.

## Route Mapping

Source: `minha-saude-feminina mobile/src/App.tsx`

Navigation must be configured from `front_mobile/App.tsx` using React
Navigation. Main tab routes remain visible in bottom navigation; secondary
flows should be stack screens where the bottom tab can be hidden.

| Web path | Mobile route name | Params | Source file | Mobile file | Navigator role | Bottom tab |
|---|---|---|---|---|---|---|
| `/` | `Today` | none | `src/pages/TodayPage.tsx` | `front_mobile/src/pages/TodayPage.tsx` | tab screen | visible |
| `/ciclo` | `Cycle` | none | `src/pages/CyclePage.tsx` | `front_mobile/src/pages/CyclePage.tsx` | tab screen | visible |
| `/conteudos` | `Contents` | none | `src/pages/ContentsPage.tsx` | `front_mobile/src/pages/ContentsPage.tsx` | tab screen | visible |
| `/perfil` | `Profile` | none | `src/pages/ProfilePage.tsx` | `front_mobile/src/pages/ProfilePage.tsx` | tab screen | visible |
| `/conteudo/:id` | `ContentDetail` | `id: string` | `src/pages/ContentDetailPage.tsx` | `front_mobile/src/pages/ContentDetailPage.tsx` | stack screen | hidden |
| `/pergunta` | `AnonymousQuestion` | none | `src/pages/AnonymousQuestionPage.tsx` | `front_mobile/src/pages/AnonymousQuestionPage.tsx` | stack screen | hidden |
| `/sintomas` | `Symptoms` | optional `sourceAction?: string` | `src/pages/SymptomsPage.tsx` | `front_mobile/src/pages/SymptomsPage.tsx` | stack screen | hidden |
| `/lembretes` | `Reminders` | none | `src/pages/RemindersPage.tsx` | `front_mobile/src/pages/RemindersPage.tsx` | stack screen | hidden |
| `/apoio` | `Support` | none | `src/pages/SupportPage.tsx` | `front_mobile/src/pages/SupportPage.tsx` | stack screen | hidden |
| `/trilhas` | `LifeStages` | none | `src/pages/LifeStagesPage.tsx` | `front_mobile/src/pages/LifeStagesPage.tsx` | stack screen | hidden |
| `*` | `NotFound` | optional `attemptedRoute?: string` | `src/pages/NotFound.tsx` | `front_mobile/src/pages/NotFoundPage.tsx` | stack/fallback screen | hidden |

Back behavior from source `navigate(-1)` must become React Navigation
`goBack()` when possible, with fallback to the `Today` route.

## Page Mapping

| Source page | Mobile page | Services/utilities expected | Migration notes |
|---|---|---|---|
| `TodayPage.tsx` | `front_mobile/src/pages/TodayPage.tsx` | `cycleService`, `symptomsService`, `remindersService`, date helpers | Preserve greeting, cycle phase, days until next period, today's symptoms, upcoming reminders, daily tip and disclaimer. |
| `CyclePage.tsx` | `front_mobile/src/pages/CyclePage.tsx` | `cycleService`, `date` and `cycle` utils | Preserve month navigation, period/predicted/fertile/ovulation/symptom markers, stats and symptom CTA. |
| `ContentsPage.tsx` | `front_mobile/src/pages/ContentsPage.tsx` | `contentService`, `text` utils | Preserve category filter, search by title/summary and empty state. |
| `ContentDetailPage.tsx` | `front_mobile/src/pages/ContentDetailPage.tsx` | `contentService`, navigation helper | Preserve id lookup, not-found state, sections, disclaimer and save/share/reminder feedback. |
| `SymptomsPage.tsx` | `front_mobile/src/pages/SymptomsPage.tsx` | `symptomsService` | Preserve select/deselect behavior, default intensity `leve`, intensity changes, save button visibility and success feedback. |
| `RemindersPage.tsx` | `front_mobile/src/pages/RemindersPage.tsx` | `remindersService`, date helpers | Preserve reminder list, completed toggle, completed visual state and success feedback. |
| `AnonymousQuestionPage.tsx` | `front_mobile/src/pages/AnonymousQuestionPage.tsx` | `anonymousQuestionService` | Preserve blank validation, welcome message, delayed bot response and UBS guidance. Replace DOM scroll ref with React Native list/scroll behavior. |
| `ProfilePage.tsx` | `front_mobile/src/pages/ProfilePage.tsx` | `profileService` | Preserve user/cycle info, stats, notification toggle, data-sharing toggle and support/life-stage links. |
| `SupportPage.tsx` | `front_mobile/src/pages/SupportPage.tsx` | `supportService` | Preserve 180 CTA, violence guidance, emergency contacts and UBS guidance. |
| `LifeStagesPage.tsx` | `front_mobile/src/pages/LifeStagesPage.tsx` | static data access | Preserve life-stage cards, optional age chip and visual content CTA. |
| `NotFound.tsx` | `front_mobile/src/pages/NotFoundPage.tsx` | navigation helper | Replace web anchor with mobile fallback navigation to `Today`. |
| `Index.tsx` | excluded | none | Lovable placeholder not wired as a main route; do not migrate as a product screen. |

## Component Mapping

| Source artifact | Mobile target | Responsibility |
|---|---|---|
| `src/components/BottomNav.tsx` | `front_mobile/src/components/layout/BottomTabs.tsx` and `front_mobile/App.tsx` | Bottom tab visuals plus route wiring for Today, Cycle, Contents and Profile. |
| `src/components/QuickActionsModal.tsx` | `front_mobile/src/components/layout/QuickActionsSheet.tsx` | Mobile sheet/modal for quick actions and action-to-route mapping. |
| `src/components/MedicalDisclaimer.tsx` | `front_mobile/src/components/ui/MedicalDisclaimer.tsx` | Preserve normal and compact health-safety copy. |
| `src/components/NavLink.tsx` | excluded | React Router wrapper; replace with React Navigation actions. |
| `src/components/ui/button.tsx` | `front_mobile/src/components/ui/AppButton.tsx` | Recreate only needed button variants with `Pressable`. |
| `src/components/ui/card.tsx` | `front_mobile/src/components/ui/AppCard.tsx` | Recreate card surface with `View` and `StyleSheet`. |
| `src/components/ui/input.tsx` | `front_mobile/src/components/ui/AppTextInput.tsx` | Recreate text entry with `TextInput`. |
| `src/components/ui/switch.tsx` and source toggle patterns | `front_mobile/src/components/ui/AppToggle.tsx` | Recreate boolean toggle with React Native-compatible control. |
| `src/components/ui/badge.tsx` and chip spans | `front_mobile/src/components/ui/AppChip.tsx` | Recreate badges/chips for categories, symptoms and age labels. |
| `src/components/ui/sonner.tsx`, `src/components/ui/toast.tsx`, `sonner` calls | `front_mobile/src/components/ui/FeedbackMessage.tsx` | Replace web toast success messages with mobile-compatible feedback. |
| Generated Radix/shadcn UI folder | excluded as direct ports | Do not migrate DOM/Tailwind/Radix wrappers; recreate only required mobile primitives. |
| Page-level headers and back buttons | `front_mobile/src/components/layout/AppHeader.tsx` | Shared title/back/header pattern. |
| Page containers and safe bottom spacing | `front_mobile/src/components/layout/SafeAreaScreen.tsx` and `front_mobile/src/components/layout/AppScreen.tsx` | Shared safe-area and scroll/container behavior. |

## Static Data Mapping

Source: `minha-saude-feminina mobile/src/data/mockData.ts`

Target: `front_mobile/src/data/mockData.ts`

| Source export | Target export | Notes |
|---|---|---|
| `mockUser` | `mockUser` plus `UserProfile` type | Preserve profile, cycle averages, settings and stats. |
| `mockSymptomTypes` | `mockSymptomTypes` plus `SymptomType` type | Preserve ids, labels and emoji icons. |
| `mockSymptoms` | `mockSymptoms` plus `SymptomEntry` type | Preserve dates, intensity values and notes. |
| `mockReminders` | `mockReminders` plus `Reminder` type | Preserve title, type, date and completed state. |
| `mockPeriods` | `mockPeriods` plus `PeriodRange` type | Preserve period ranges for calendar logic. |
| `contentCategories` | `contentCategories` plus `ContentCategory` type | Preserve category ids, labels, icons and colors. |
| `mockContents` | `mockContents` plus `ContentArticle` type | Preserve article sections and source copy. |
| `healthTips` | `healthTips` | Preserve daily tip rotation input. |
| `quickActions` | `quickActions` plus `QuickAction` type | Preserve labels, ids and route mapping. |
| `lifeStages` | `lifeStages` plus `LifeStage` type | Preserve age labels and descriptions. |
| `emergencyContacts` | `emergencyContacts` plus `EmergencyContact` type | Preserve contact names, numbers and descriptions. |
| `chatResponses` | `chatResponses` | Preserve keyword response content. |

## Business Rule Mapping

| Source behavior | Source location | Mobile target | Rule to preserve |
|---|---|---|---|
| Cycle day calculation | `TodayPage.tsx`, `CyclePage.tsx` | `front_mobile/src/utils/cycle.ts`, `front_mobile/src/services/cycleService.ts` | Calculate days since `lastPeriodDate`, derive cycle day and days until next period from `cycleAverageDays`. |
| Cycle phase labels | `TodayPage.tsx` | `cycleService` | `cycleDay <= 5` Menstrual; `<= 13` Folicular; `<= 16` Ovulatoria; otherwise Lutea. |
| Calendar day tags | `CyclePage.tsx` | `cycleService`, `cycle` utils | Mark actual periods, predicted periods, fertile window, ovulation and symptom days. |
| Daily health tip | `TodayPage.tsx` | `cycleService` or page helper | Select `healthTips[today.getDate() % healthTips.length]`. |
| Today symptoms | `TodayPage.tsx` | `symptomsService` | Filter symptoms by today's ISO date. |
| Upcoming reminders | `TodayPage.tsx` | `remindersService` | Show incomplete reminders, limited to three. |
| Content filtering | `ContentsPage.tsx` | `contentService`, `text` utils | Filter by category and case-insensitive title/summary search. |
| Content not-found | `ContentDetailPage.tsx` | `contentService` | Unknown id shows a visible not-found state. |
| Content feedback | `ContentDetailPage.tsx` | `FeedbackMessage` | Preserve success meanings: content saved, link copied, reminder added. |
| Symptom selection | `SymptomsPage.tsx` | `symptomsService` | Select adds symptom with `leve`; deselect removes; intensity updates by type. |
| Symptom save | `SymptomsPage.tsx` | `symptomsService`, `FeedbackMessage`, navigation helper | Save only when selected list is non-empty; feedback includes count; navigate back. |
| Reminder completion | `RemindersPage.tsx` | `remindersService` | Toggle `completed`, update visual state and show success feedback. |
| Anonymous response selection | `AnonymousQuestionPage.tsx` | `anonymousQuestionService` | Keyword matching for corrimento, colica, atraso/atrasou, normal, default. |
| Anonymous input validation | `AnonymousQuestionPage.tsx` | `anonymousQuestionService` or screen validation | Empty/whitespace input must not send a message. |
| Anonymous delayed response | `AnonymousQuestionPage.tsx` | `AnonymousQuestionPage.tsx` with service output | Append bot response after short delay and include UBS guidance. |
| Profile toggles | `ProfilePage.tsx` | `profileService` and optional context | Notification and data-sharing booleans toggle immediately. |
| Quick action navigation | `QuickActionsModal.tsx` | `QuickActionsSheet`, navigation types | Preserve source id-to-route mapping for menstruacao, sintomas, corrimento, colica, humor, lembrete, pergunta and conteudo. |
| Medical disclaimer | `MedicalDisclaimer.tsx` | `front_mobile/src/components/ui/MedicalDisclaimer.tsx` | Preserve normal and compact health-safety copy in educational flows. |

## API Boundary Mapping

The source app currently uses static data and local component state. No active
`fetch`, `axios`, Supabase or external backend request was found in the app
flows inspected. Even so, the Expo destination must keep API access isolated in
`front_mobile/src/api` so a future backend can replace static adapters without
rewriting screens.

| API module | Initial backing source | Called by service | Purpose |
|---|---|---|---|
| `front_mobile/src/api/types.ts` | new local types | all API modules | Define normalized `ApiResult<T>` and error shape. |
| `front_mobile/src/api/contentApi.ts` | `front_mobile/src/data/mockData.ts` | `contentService` | List categories/articles and fetch article by id. |
| `front_mobile/src/api/profileApi.ts` | `front_mobile/src/data/mockData.ts` plus local state | `profileService` | Read profile and update preference toggles. |
| `front_mobile/src/api/symptomsApi.ts` | `front_mobile/src/data/mockData.ts` plus local state | `symptomsService` | Read symptom types/entries and save selected symptoms. |
| `front_mobile/src/api/remindersApi.ts` | `front_mobile/src/data/mockData.ts` plus local state | `remindersService` | Read reminders and toggle completion. |
| `front_mobile/src/api/supportApi.ts` | `front_mobile/src/data/mockData.ts` | `supportService` | Read emergency contacts and support content. |

Screens in `front_mobile/src/pages` must not contain raw HTTP logic. They should
call services/hooks, and those services may call `src/api`.

## Asset Mapping

| Source asset | Mobile decision |
|---|---|
| `public/favicon.ico` | Candidate visual reference for future Expo app icon work; do not overwrite current Expo icons until asset task T050. |
| `public/placeholder.svg` | Do not migrate unless a placeholder is explicitly needed; only used by Lovable placeholder `Index.tsx`. |
| `public/robots.txt` | Exclude; web-only. |
| `front_mobile/assets/images/*` | Existing Expo template assets; preserve until the asset migration task decides replacements. |

## Dependency Replacement Map

| Web dependency/pattern | Mobile replacement |
|---|---|
| `react-router-dom` | React Navigation |
| `BrowserRouter`, `Routes`, `Route` | `NavigationContainer`, stack and bottom tabs |
| `sonner` | Mobile feedback component or native alert pattern |
| `@radix-ui/*` | React Native primitives/custom components |
| `lucide-react` | `@expo/vector-icons` or existing Expo icon approach; add another icon package only if justified |
| `react-dom` | Not used by native app screens |
| `@tanstack/react-query` | Do not carry unless real async backend requests justify it |
| `react-hook-form`, `zod`, `@hookform/resolvers` | Local React Native form state and small validation helpers first |
| `tailwindcss`, `tailwindcss-animate`, `tailwind-merge`, `class-variance-authority`, `clsx` | `StyleSheet` plus shared theme constants; small helper only if needed |
| `react-day-picker` | Custom React Native calendar/list layout for cycle screen |
| `recharts` | React Native cards/lists first; chart dependency only if future UI requires charts |
| `cmdk`, `input-otp`, `vaul`, `embla-carousel-react`, `react-resizable-panels`, `next-themes` | Excluded; web-only or unnecessary for current flows |
| HTML elements | `View`, `Text`, `Pressable`, `TextInput`, `Image`, `ScrollView`, `FlatList`, `Modal` |
| Tailwind/CSS variables | `StyleSheet` plus shared theme constants |
| DOM refs/scrollIntoView | React Native scroll refs/list behavior |

## Destination Expo Verification

Verified under `front_mobile/`:

| Area | Current state | Migration implication |
|---|---|---|
| Project root | Existing Expo project named `front_mobile` | Reuse this project; do not create another Expo project. |
| `package.json` main | `expo-router/entry` | Must later be changed to an `index.ts` entry that registers `App.tsx`. |
| Scripts | `start`, `android`, `ios`, `web`, `lint`, `reset-project` | Keep useful Expo scripts; no source web scripts should be copied. |
| Expo configuration | `app.json` includes the `expo-router` plugin, `experiments.typedRoutes: true`, `experiments.reactCompiler: true`, native icon/splash assets, scheme `frontmobile`, and Expo SDK 54-compatible app metadata | Preserve useful native app metadata and splash/icon references. Disable Expo Router plugin and typed routes later, after `App.tsx` and `index.ts` replace the router entry. |
| Existing navigation scaffold | `app/`, `app/(tabs)/`, `app/_layout.tsx` | Expo Router scaffold exists and must be removed/disabled after `App.tsx` + React Navigation replacement is ready. |
| Template route files | `app/_layout.tsx`, `app/modal.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx` | Current routes are Expo template screens only. They are verification input for scaffold removal and must not become the migrated product routes. |
| TypeScript configuration | `tsconfig.json` extends `expo/tsconfig.base`, enables `strict: true`, includes `**/*.ts`, `**/*.tsx`, `.expo/types/**/*.ts` and `expo-env.d.ts`, and defines `@/*` as a root-relative alias | Compatible with the Expo TypeScript baseline for the current scaffold; future migration files can rely on strict checking, while alias usage should be revisited if imports move exclusively under `src/`. |
| Required `src/` | Complete required folder structure now exists: `src/api/`, `src/assets/`, `src/components/layout/`, `src/components/ui/`, `src/context/`, `src/data/`, `src/hooks/`, `src/pages/`, `src/redux/`, `src/services/`, and `src/utils/` | Use these folders for all migrated implementation files. |
| Root `App.tsx` | Created as a temporary React Native placeholder screen with Expo `StatusBar` | Replace the placeholder with React Navigation wiring during Phase 4. |
| Root `index.ts` | Created and registers `App.tsx` with Expo `registerRootComponent` | `package.json` still points at `expo-router/entry` until T038 switches the main entry to `index.ts`. |
| Template components | `components/`, `constants/`, `hooks/` | Existing Expo template files are outside the required structure and should not become the migration architecture. |
| Existing assets | `assets/images/*` | Preserve until asset migration task; do not delete during verification. |

Current useful installed dependencies:

- Expo SDK 54, React 19.1, React Native 0.81.
- `@react-navigation/native`, `@react-navigation/bottom-tabs`,
  `react-native-screens`, `react-native-safe-area-context`,
  `react-native-gesture-handler`.
- `@expo/vector-icons`, `expo-font`, `expo-splash-screen`,
  `expo-status-bar`.

Current dependency risks:

- `expo-router` is installed and active as the main entry. This conflicts with
  the required `App.tsx` + `src/pages` architecture and must be replaced later,
  after the new entry is in place.
- `@react-navigation/native-stack` is not listed in `package.json`; install it
  only if the implemented stack navigator requires it.
- `react-dom` and `react-native-web` are present from the Expo template but web
  output is not a migration target.

## Pending Detailed Mapping

- Scaffold changes needed in the existing Expo project.
- Final validation notes after implementation.
