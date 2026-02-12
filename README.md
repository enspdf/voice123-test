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

- Node.js (v18+ recommended)
- npm
- Git

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

### Branch: `TSK-1-add-read-me`

| Date       | Task / activity              | Hours |
| ---------- | ---------------------------- | ----- |
| 2026-02-11 | Add README & initial worklog | 1     |

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

### Branch: `TSK-5-setup-api-types-react-query-hooks`

| Date       | Task / activity                                                            | Hours |
| ---------- | -------------------------------------------------------------------------- | ----- |
| 2026-02-12 | setup tests for react-query hooks, implement attributes and search queries | 2.5   |

### Task list (this branch)

- Generate response types for attributes route and search route with aggregations
- Setup tests for react-query hooks
- Build the attributes and search query hooks and fetch function to call endpoints.

---

### Branch: `TSK-6-add-filters-to-the-search`

| Date       | Task / activity                                                        | Hours |
| ---------- | ---------------------------------------------------------------------- | ----- |
| 2026-02-12 | Move components and files to follow feature folder structure           | 0.5   |
| 2026-02-12 | Load and map attributes on search load and store globally              | 1     |
| 2026-02-12 | Add filters UI to search page to allow user to filter searched results | 1.5   |

### Task list (this branch)

- Move components and files to follow feature folder structure.
- Create view folder and have the complete UI encapsulated on a specific view assigned to the page.
- Load mapped attributes server side to have better performance and load page faster, enable attributes access globally.
- Add UI filters to the search UI based on the mapped attributes

---

### Branch: `TSK-6-add-filters-to-the-search`

| Date       | Task / activity                                                           | Hours |
| ---------- | ------------------------------------------------------------------------- | ----- |
| 2026-02-12 | Adds zustand to global state management & store all attributes            | 0.5   |
| 2026-02-12 | Created attributes store and setup dev tools to see zustand store content | 0.1   |
| 2026-02-12 | Map and filter specific attributes to build options used to filter        | 0.5   |
| 2026-02-12 | Create and setup the folder structure to properly set the search view     | 0.5   |
| 2026-02-12 | Create filter button, and filters drawer to display the attribute options | 1     |

### Task list (this branch)

- Move components and files to follow feature folder structure.
- Create view folder and have the complete UI encapsulated on a specific view assigned to the page.
- Load mapped attributes server side to have better performance and load page faster, enable attributes access globally.
- Add UI filters to the search UI based on the mapped attributes

---

### Branch: `TSK-6-display-pro-card-results`

| Date       | Task / activity                                                                | Hours |
| ---------- | ------------------------------------------------------------------------------ | ----- |
| 2026-02-12 | Fetched search server side and store information in zustand store              | 0.5   |
| 2026-02-12 | Created provider/voice actor grid and card with basic information              | 2     |
| 2026-02-12 | Use attributes in the store to display 1 of each attribute with the label name | 0.5   |
| 2026-02-12 | Created/adjusted and debugged the player                                       | 1     |

### Task list (this branch)

- Fetched search server side and store information in zustand store
- Created provider/voice actor grid and card with basic information
- Created/adjusted and debugged the player

---

### Branch: `TSK-7-apply-search-and-filters`

| Date       | Task / activity                                                                                 | Hours |
| ---------- | ----------------------------------------------------------------------------------------------- | ----- |
| 2026-02-12 | Create search states to keep and store the selected filters globally across the whole app       | 1     |
| 2026-02-12 | Use nuqs to persist zustand filters with the url and keep both synchronized                     | 1     |
| 2026-02-12 | Update search bar to update keyword filter on enter or click on the button                      | 0.2   |
| 2026-02-12 | Update react query hooks to use nuqs and zustand to perform the search using those query params | 1     |
| 2026-02-12 | Create search states to keep and store the selected filters globally across the whole app.      | 2     |

### Task list (this branch)

- Create search states to keep and store the selected filters globally across the whole app.
- Use nuqs to persist zustand filters with the url and keep both synchronized.
- Update search bar to update keyword filter on enter or click on the button.
- Update react query hooks to use nuqs and zustand to perform the search using those query params.
- Create search states to keep and store the selected filters globally across the whole app.

---

### Branch: `TSK-8-display-search-pagination`

| Date       | Task / activity                                                                                                          | Hours |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| 2026-02-12 | Update provider cards grid to add pagination component & set default page on each filter update to get correct responses | 0.5   |
| 2026-02-12 | Update readme, remove .env.example from gitignore to have the example variables                                          | 0.0   |

### Task list (this branch)

- Update provider cards grid to add pagination component & set default page on each filter update to get correct responses
- Update readme, remove .env.example from gitignore to have the example variables.

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
- Generate attributes and search types based on API response.
- Setup the base to test the react-query hooks.
- Process and create the base mapper to filter the attributes I've selected to be used as filters.
- Defined and proposed the initial version of the filters drawer and items position.
- Generate commit messages.
- Build audio player
- Fix and create some unit tests
- Assisted in fixing zustand search filters to keep params and state synchronized after updates and reloads when query parameters exist.
- Helped refactor and document search and filter logic for better maintainability.
- Suggested improvements to how the URL and search state are kept in sync, specifically when filters are updated in quick succession.
- Aided in debugging and fixing edge cases where URL query params and zustand state could get out of sync after navigation or page reload.
- Proposed enhancements to the user experience for filter persistence and state restoration on refresh.
- Helped to reset to the default page (1) on filter updates.
