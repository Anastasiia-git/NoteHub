git # NoteHub

NoteHub is a responsive note manager built with Next.js App Router, TypeScript, TanStack React Query, Zustand, Axios, and CSS Modules.

Live demo: https://note-hub-drab.vercel.app/

## Screenshots

### Home

![NoteHub home page](screenshots/home.png)

### Notes

![NoteHub notes page](screenshots/notes.png)

### Create Note

![NoteHub create note page](screenshots/create.png)

## Why This Project Is In My Portfolio

This project is designed to show practical frontend skills recruiters usually look for in a junior developer:

- clean Next.js App Router structure
- dynamic routes and modal routing
- typed API layer with Axios and TypeScript
- server-state management with TanStack React Query
- draft autosave with Zustand persist
- search, tag filtering, pagination, create, details, and delete flows
- loading, error, empty, and not-found states
- responsive mobile-first CSS Modules
- dark/light theme support
- SEO and social preview metadata

## Features

- View notes from a remote API
- Search notes by keyword
- Filter notes by category
- Highlight the selected category
- Open note details as a route or modal preview
- Create a note with title, content, and category
- Autosave the create-note draft in localStorage
- Delete notes with confirmation and user feedback
- Refresh cached note data after mutations
- Switch between light and dark themes
- Use responsive layouts for mobile, tablet, and desktop

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- TanStack React Query
- Zustand
- Axios
- React Hot Toast
- CSS Modules
- Lucide React icons

## Technical Decisions

- **App Router:** pages, loading states, error boundaries, dynamic routes, and parallel modal routes live in the `app` directory.
- **React Query:** remote notes are cached by tag, search query, and page. Mutations invalidate related note queries.
- **Zustand persist:** create-note draft data survives refreshes until the note is created.
- **Single tag source:** note categories are defined once in `types/note.ts` and reused by the form and sidebar.
- **CSS Modules:** styling stays local to each component, with mobile-first rules and breakpoints at `768px` and `1024px`.
- **Public API token:** `NEXT_PUBLIC_NOTEHUB_TOKEN` is used because the training API expects a browser-side token. In a production app, this would usually be handled through a server route.

## Getting Started

Clone the project:

```bash
git clone https://github.com/Anastasiia-git/NoteHub.git
cd NoteHub
```

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
```

Run locally:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Quality Checks

Before publishing changes, run:

```bash
npm run lint
npm run build
```

The current version passes both checks.

## Project Structure

```text
app/
  notes/
    action/create/
    filter/
    [id]/
components/
  ErrorState/
  Header/
  Footer/
  Hero/
  Modal/
  NoteForm/
  NoteList/
  Pagination/
  SearchBox/
  Spinner/
  ThemeToggle/
lib/
  api.ts
  store/
types/
  note.ts
```

## What I Would Improve Next

- Add edit-note functionality
- Add automated component or integration tests
- Add authentication for private notes
- Move API token usage behind a server route in a production version

## Author

Anastasiia Totska  
GitHub: https://github.com/Anastasiia-git
