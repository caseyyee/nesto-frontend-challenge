# Casey's Front-End Coding Challenge Submission

It's mortgage season! My challenge is to build a microsite that empowers clients to get the lowest rate on first try!

- [View Deployed App](https://nesto-frontend-challenge.vercel.app/)
- [Github](https://github.com/caseyyee/nesto-frontend-challenge)

<img src="https://raw.githubusercontent.com/caseyyee/nesto-frontend-challenge/master/docs/home-desktop.jpg" alt="Home">
<img src="https://raw.githubusercontent.com/caseyyee/nesto-frontend-challenge/master/docs/application-desktop.jpg" alt="Application">
<div style="display:flex">
<img src="https://raw.githubusercontent.com/caseyyee/nesto-frontend-challenge/master/docs/home.jpg" alt="Home - mobile" height="850">
<img src="https://raw.githubusercontent.com/caseyyee/nesto-frontend-challenge/master/docs/application.jpg" alt="Application - mobile" height="850">
</div>

# Local Development Setup

### 1. Specify environment variables in `.env.local`

```bash
NEXT_PUBLIC_NESTO_API="nesto-api-endpoint"
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Commands

```bash
# Run Development Server
pnpm run dev

# Run lint
pnpm run lint

# Run type-check
pnpm run type-check

# Run tests
pnpm run test

# Run storybook
pnpm run storybook
```

# About the Stack

- [NextJs](https://nextjs.org/docs/app) using App Router
- API Handling:
  - Server rendered components with server-side `GET`, Invalidation with [server action](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations)
  - [react-query](https://tanstack.com/query/v5/docs/framework/react/overview) for client-side `PUT` operations
  - [Zod](https://zod.dev/) validated on all API operations
- Localization using [next-intl](https://next-intl.dev/) with app routing `/[locale]`. `/en` and `/fr` languages
- Styling:
  - [TailwindCSS](https://tailwindcss.com/)
  - [Class Variance Authority](https://cva.style/docs) to manage style variants
- Unit testing with [vitest](https://vitest.dev/) `*.test.*` files.
- [Storybook](https://storybook.js.org/) for visual testing and component reference, `*.stories.*` files.

# Additional notes

- [API](./docs/api-notes.md)
