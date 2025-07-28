# Portfolio IDE

A portfolio website built with Next.js that looks and feels like Visual Studio Code. Browse your resume as “files” in a sidebar, open sections in tabs, and even run commands in a live terminal. All your resume data lives in one editable file, so updating your content is as simple as changing a few values.

## Features

- **Structured Data**  
  All resume content (about, education, experience, skills, projects, certifications, leadership, awards) lives in `lib/resume-data.ts`.  
- **VS Code‑Style Layout**  
  - **Sidebar** (file‑explorer view of your resume sections + social links)  
  - **Workspace** (tabbed interface for each section)  
  - **Terminal** (type commands like `about`, `skills`, `projects`, `clear`, etc.)  
- **Responsive Design**  
  - Desktop: full IDE view with terminal  
  - Mobile: slide‑out sidebar, hidden terminal, optimized touch targets  
- **SEO‑Friendly**  
  Basic metadata added in `app/layout.tsx`  

## Tech Stack

- Next.js (App Router)  
- TypeScript  
- React  
- Tailwind CSS  
- ShadCN UI (for responsive sidebar/sheet)  

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/salik03/portfolio.git
   cd portfolio

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   yarn
   ```

3. **Run in development mode**

   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to explore your VS Code‑style portfolio.

## Project Structure

```
portfolio/
├─ app/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ ide-sidebar.tsx
│  ├─ ide-workspace.tsx
│  ├─ ide-terminal.tsx
│  └─ content/
├─ lib/
│  ├─ resume-data.ts
│  └─ utils.ts
├─ hooks/
├─ public/
├─ styles/
├─ package.json
└─ tsconfig.json
```

## Customize Your Content

All text and links are in `lib/resume-data.ts`. Update that file to:

* Change your personal statement
* Add or remove items in education, experience, skills, projects, etc.
* Update social links or icons in the sidebar

Every change appears instantly in your IDE‑style portfolio. Enjoy!
