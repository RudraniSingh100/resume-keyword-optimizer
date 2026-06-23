# Resume Keyword Optimizer

A production-ready Next.js 15 web app that compares a resume against a job description, calculates a keyword match score, and suggests practical improvements.

## Features

- Resume and job description text areas
- Client-side keyword extraction with stop-word filtering
- Match score from 0-100%
- Missing and found keyword lists
- Top improvement suggestions
- Loading state and copy results button
- Responsive single-page layout
- Mandatory footer with Rudrani contact details and Digital Heroes link
- No paid APIs and no external backend

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- React 19
- Vercel free tier compatible

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Project Structure

```text
app/
  globals.css        Global Tailwind styles
  layout.tsx         Root layout and metadata
  page.tsx           Single-page application shell and state
components/
  Footer.tsx         Mandatory footer and Digital Heroes link
  ResultsPanel.tsx   Match score, keywords, suggestions, copy action
  TextInputPanel.tsx Reusable labeled textarea component
lib/
  keywordAnalysis.ts Typed keyword extraction, comparison, scoring, suggestions
types/
  analysis.ts        Shared TypeScript result and keyword types
```

## Keyword Logic

The app runs entirely in the browser. It normalizes text, removes common stop words, counts keywords, compares job description keywords against resume keywords, and calculates:

```text
match score = found job keywords / total job keywords * 100
```

Suggestions are generated from the highest-priority missing keywords.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [Vercel](https://vercel.com/new).
3. Import the GitHub repository.
4. Keep the default framework preset as `Next.js`.
5. Use the default build command:

```bash
npm run build
```

6. Use the default output settings.
7. Click `Deploy`.

The app does not require environment variables, paid services, serverless databases, or external APIs.

## Suggested Git Commit Messages

```text
Initial Next.js app scaffold
Add resume keyword analysis engine
Build responsive optimizer interface
Add footer branding and contact details
Document Vercel deployment workflow
```
