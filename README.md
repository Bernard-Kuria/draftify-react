# Draftify React ✨

**A ready-to-use React editor built on top of Draftify**

`draftify-react` is a **fully styled, production-ready React editor** powered by the `draftify` core engine. It provides an out-of-the-box editing experience while preserving the structured, schema-driven philosophy of Draftify.

This package focuses purely on **UI and interaction**.
All document logic, schemas, validation, and export utilities live in `draftify`.

---
[![npm](https://img.shields.io/npm/v/draftify-react)](https://www.npmjs.com/package/draftify-react)
## ⚠️ Important Dependency Notice

`draftify-react` **does not work on its own**.

It requires the Draftify core engine:

```bash
npm install draftify
npm install draftify-react
```

Both packages must be installed.
`draftify-react` renders and manipulates **Draftify documents**, but it does not define the document model itself.

---

## Features

- ✅ Ready-to-use rich editor
- ✅ Built on top of `draftify`
- ✅ Precompiled CSS (no Tailwind setup required)
- ✅ Tailwind v4 compatible
- ✅ Drag & drop block reordering
- ✅ Document metadata handling
- ✅ Preview & editor modes
- ✅ Clipboard, export & formatting support
- ✅ Reader component for rendering documents
- ✅ Zero configuration required to start

---

## Installation

```bash
npm install draftify draftify-react
```

---

## ❗ Controlled Editor (Very Important)

`draftify-react` is a **controlled editor**.

This means:

- **You own the document state**
- The editor **does not store blocks internally**
- You must declare and manage the blocks array yourself

This design is intentional. It allows:

- Full control over persistence (database, localStorage, APIs)
- Multiple views of the same document (editor + reader)
- Easy integration with frameworks and state managers
- Predictable, debuggable data flow

---

## Minimal Usage (Required Pattern)

This is the **correct and complete** way to use `draftify-react`.

```tsx
import { useState } from "react";
import type { DraftifyBlock } from "draftify";
import DraftifyReact, { Reader } from "draftify-react";
import "draftify-react/styles.css";

export default function App() {
  const [blocksData, modifyBlocks] = useState<DraftifyBlock[]>([]);

  return (
    <>
      <DraftifyReact blocksData={blocksData} modifyBlocks={modifyBlocks} />

      {/* Render the same document anywhere */}
      <Reader blocksData={blocksData} />
    </>
  );
}
```

### What’s happening here

- `blocksData` holds the Draftify document
- `modifyBlocks` is passed to the editor
- The editor updates state via `modifyBlocks`
- `Reader` consumes the **same data** to render content

There is **one source of truth** for your document.

---

## TypeScript Users (Recommended)

Draftify exposes its schema types via the core package.

You should always type your state explicitly:

```ts
import type { DraftifyBlock } from "draftify";

const [blocksData, modifyBlocks] = useState<DraftifyBlock[]>([]);
```

This ensures:

- Full IntelliSense
- Compile-time validation
- Safer integration with APIs and storage layers

---

## Styling (Required)

`draftify-react` ships with **precompiled CSS**.

You must import it **once** in your app:

```css
@import "draftify-react/styles.css";
```

or in JavaScript:

```ts
import "draftify-react/styles.css";
```

### Tailwind v4 Users

No configuration required.
All Draftify styles are already compiled and scoped.

---

## Reader Component

`draftify-react` exports a `Reader` component for rendering documents without editing.

```tsx
import { Reader } from "draftify-react";

<Reader blocksData={blocksData} />;
```

Use cases:

- Read-only previews
- Blog posts
- Exported documents
- Public-facing content

The `Reader` component **never mutates data**.

---

## Hooks API (Advanced)

### `useDraftifyReact`

```ts
import { useDraftifyReact } from "draftify-react";
```

This hook powers the editor internally and exposes:

- Document state helpers
- Block creation & modification functions
- Drag & drop handlers
- View and animation state

This is intended for:

- Custom editors
- Headless integrations
- Advanced UI wrappers

Most users **do not need this hook**.

---

## Collaboration Between Packages

Draftify is intentionally split into two layers:

### `draftify`

- Schema definitions
- Block types
- Validation
- Normalization
- Clipboard & export helpers
- Framework-agnostic logic

### `draftify-react`

- React components
- UI interactions
- Animations
- Styling
- Editor and Reader views

Because of this separation:

- `draftify` can be used in **any framework**
- `draftify-react` can evolve independently
- You can build alternative UIs without rewriting logic

---

## Project Structure

```
draftify-react/
├─ dist/
│  ├─ draftify-react.es.js
│  ├─ draftify-react.umd.js
│  └─ draftify-react.css
│
├─ index.d.ts
├─ package.json
└─ README.md
```

Only runtime-required files are shipped.

---

## Exports

```ts
import DraftifyReact from "draftify-react";
import { Reader, useDraftifyReact } from "draftify-react";
```

Styles:

```css
@import "draftify-react/styles.css";
```

---

## When to Use `draftify-react`

Use this package if you want:

- A complete editor UI
- Fast React integration
- Full control over document state
- A clean abstraction over Draftify internals

If you want to build your own editor UI or use Draftify outside React, use `draftify` directly.

---

## Compatibility

- React ≥ 18
- TypeScript supported
- Tailwind v4 supported
- ESM & UMD builds included

---

## License

MIT © 2025 Draftify Team

---

Bernard Kuria Mechatronics Engineer • Developer • Creator of E-NEXUS, DigiSign, and Draftify 📍 Nyeri, Kenya 🌐 https://bernard-webfolio.web.app
