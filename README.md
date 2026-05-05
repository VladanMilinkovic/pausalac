# Subscription App (Expo + TypeScript)

This repository contains the Expo React Native app baseline for MVP development.

## Runtime

This project targets `Node 22.21.1`.

If you use `nvm`, run:

```bash
nvm use
```

## Getting Started

Install dependencies and start the Expo dev server:

```bash
npm install
npm run start
```

You can also launch platform-specific flows:

```bash
npm run android
npm run ios
npm run web
```

## TypeScript and Linting

The app uses strict TypeScript settings and Expo's ESLint baseline.

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Project Structure

Core app code lives in `src/`:

- `components/` shared UI building blocks
- `screens/` screen-level components
- `navigation/` app navigation setup
- `store/` state management primitives
- `storage/` persistence layer abstractions
- `utils/` helper functions
- `types/` shared TypeScript types
