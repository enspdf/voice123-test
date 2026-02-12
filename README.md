# voice123-test

> **Branch:** `TSK-1-add-read-me` — _Update this line when working on a different branch. For per-branch worklogs, see [Worklog](#worklog) and [Per-branch docs](#per-branch-documentation)._

---

## Table of contents

- [Application setup guide](#application-setup-guide)
- [Worklog](#worklog)
- [Future improvements and recommendations](#future-improvements-and-recommendations)
- [How AI was used in this project](#how-ai-was-used-in-this-project)
- [Per-branch documentation](#per-branch-documentation)

---

## Application setup guide

### Prerequisites

- [ ] Node.js (v18+ recommended) — _adjust for your stack_
- [ ] npm / yarn / pnpm
- [ ] Git

### Clone and install

```bash
git clone https://github.com/enspdf/voice123-test
cd voice123-test
npm install
```

### Environment

- Copy `.env.example` to `.env` and fill in required variables (create `.env.example` when you add env vars).
- Document any API keys or secrets in `.env.example` with placeholder values only.

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Build for production

```bash
npm run build
```

---

## Worklog

_Update this section as you work. For detailed per-branch logs, you can add `docs/worklog-<branch>.md` and link it here._

### Branch: `TSK-1-add-read-me`

| Date       | Task / activity              | Hours | Status | Notes             |
| ---------- | ---------------------------- | ----- | ------ | ----------------- |
| 2026-02-11 | Add README & initial worklog | 1     | Done   | Initial structure |

### Task list (this branch)

- Read test instructions.
- Play with API endpoint and use platform to check backend endpoints used in the UI that can be used and integrated in the final test.
- Add README with setup guide and initial worklog details.

---

### Branch: `TSK-2-setup-next-js-application`

| Date       | Task / activity                               | Hours |
| ---------- | --------------------------------------------- | ----- |
| 2026-02-11 | Setup NextJS application & required libraries | 0.5   |

### Task list (this branch)

- Setup @mui/material, @emotion/react, @emotion/styled and @tanstack/react-query, nuqs packages
- Add base MUI page to test theme load and mui components rendering

---

### Branch: `TSK-3-setup-providers-and-page-layout`

| Date       | Task / activity                                                         | Hours |
| ---------- | ----------------------------------------------------------------------- | ----- |
| 2026-02-11 | Integrate custom MUI theme color dark/light and structure the providers | 0.5   |

### Task list (this branch)

- Setup @mui/icons-material
- Add custom theme to have dark/light Voice123 brand colors
- Simplify providers implementation/usage

---

### Branch: `TSK-4-layout-update-and-search-bar`

| Date       | Task / activity                                       | Hours |
| ---------- | ----------------------------------------------------- | ----- |
| 2026-02-11 | Update layout and theme colors                        | 0.5   |
| 2026-02-12 | setup tests configuration and implement search bar UI | 2     |

### Task list (this branch)

- Setup jest as testing tool & tests utilities
- Update theme colors dark/light
- Added search bar component with its base rendering tests

---

## Future improvements and recommendations

- TODO

---

## How AI was used in this project

### Tools and context

- **Tool(s):** Cursor IDE.

### What AI did

- Drafted and structured this README.
- Proposed worklog format (task list, hours, status) and per-branch documentation approach.
- Design & update the theme provider for dark/light color based ont Voice123 colors.
- Create audio wave canvas as background component to have better background color/animation instead of a plain color.
- Generate dark/light mode colors and update base MUI theme.
