# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check via project references (`tsc -b`) then production-build with Vite
- `npm run lint` — run ESLint over the whole project
- `npm run preview` — serve the production build locally

There is no test runner configured in this project yet (no test script, no test framework in `package.json`).

## Architecture

This is currently the stock `npm create vite@latest -- --template react-ts` scaffold (package name `todoadv`) — no todo-app domain logic has been added yet. Key points for when that logic is built out:

- **Entry point**: `src/main.tsx` mounts `<App />` from `src/App.tsx` into `#root` in `index.html`.
- **TypeScript project references**: `tsconfig.json` is a root pointer to `tsconfig.app.json` (app source, `src/` only) and `tsconfig.node.json` (Vite/tooling config). `npm run build` type-checks through `tsc -b`, which builds both references — new source files must fall under `src/` to be picked up by `tsconfig.app.json`'s `include`.
- **React Compiler**: enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()` in `vite.config.ts`, on top of `@vitejs/plugin-react`. Keep this in mind when writing components — the compiler auto-memoizes, so manual `useMemo`/`useCallback` is generally unnecessary.
- **ESLint flat config** (`eslint.config.js`): `js.configs.recommended` + `tseslint.configs.recommended` + `eslint-plugin-react-hooks` (flat recommended) + `eslint-plugin-react-refresh` (vite preset), scoped to `**/*.{ts,tsx}`, with `dist` globally ignored.
- **Static assets**: `public/icons.svg` holds an SVG sprite sheet referenced via `<use href="/icons.svg#icon-id">`; `src/assets/` holds imported image assets (e.g. logos, hero image).
