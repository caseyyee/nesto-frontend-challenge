# Casey's Front-End Coding Challenge Submission

It's mortgage season! My challenge is to build a microsite that empowers clients to get the lowest rate on first try!

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

# Run storybook
pnpm run storybook
```

# Project structure

# About the Stack

- Why did I chose to use TailwindCSS instead of styled-components?
  - Class variant Authority to manage variants
- Component testing with vitest, `*.test.*` files.
- Storybook for visual testing and component reference, `*.stories.*` files.
- Uses React-Query to manage API usage and Zod to validate data.

# Issues found

- Inconsistent API response compared to what was documented:

  1. family:

  - Doc: "VALUE_FLEX" (only)
  - API: "VALUE_FLEX" | "STANDARD"

  2. prepaymentOption:

  - Doc: "STANDARD" | "HELOC"
  - API: "STANDARD" | "ENHANCED"

  3. fixedPenaltySpread:

  - Doc: string (generic)
  - API: "SMALL_PENALTY" | "BANK_PENALTY" (specific enums)

  4. lenderType:

  - Doc: string (generic)
  - API: "MONOLINE" | "BIG_BANK" (specific enums)

# Workflow and tools used for this project

- What I used AI for
  - Troubleshoot storybook configuration
  - Double check my work
- AI tools: Cursor and Claude Code

### ToDo

- [ ] TestI18nProvider.tsx
- [ ] review product-utils.test.ts, cross check mock data
- [ ] screenreader accessilbility (language toggle)
- [ ] dark mode?

## App Must have

- [x] This test has to be done in React JS
- [x] Please use the **wireframe** as a guideline and we encourage you to use your creativity and your styling skills to create the design
- [x] Provide the best UX/UI possible.
- [ ] Use a Visual Indicator to show when the application is saved or updated
- [ ] Responsive design
- [x] Keep your code simple, clean and well-organized.
- [ ] Don't hesitate to come back to us with any questions along the way. We prefer that you ask questions, rather than assuming or misinterpreting requirements.
- [ ] Provide a README file with the information about your app (install, run ...)
- [ ] Create a List View for the existing applications with option to EDIT an existing application (only show the applications with valid data)
- [ ] Error handling

### Should also include

- [x] Localization: support for multiple languages (English, French, ...)
- [x] Tests (Unit, component ...)
- [x] Use storybook to showcase your components
- [ ] Feel free to deploy the microsite to to an host of your choice i.e. [Vercel](https://vercel.com/docs), [Netlifty](https://www.netlify.com/with/react/), [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

### Additional Remarks

- You can setup your microsite any way you like; we're are using React JS, Styled-components

## Supporting API

The API is hosted at https://nesto-fe-exam.vercel.app/api. This is the nesto front end exam API.

To interact with it from your code, you'll need to provide the following HTTP headers

| HTTP Header      | Value                         |
| ---------------- | ----------------------------- |
| Accept           | (REQUIRED) application/json   |
| Content-Type     | (REQUIRED) application/json   |
| X-Nesto-Candidat | (REQUIRED) Use your full name |

---

### Get products

Get a list of a mix of Variable and Fixed mortgage products

`GET https://nesto-fe-exam.vercel.app/api/products`

Returns: `Product[]`

### Create Application

Creates a new, incomplete application, and return that application

`POST https://nesto-fe-exam.vercel.app/api/applications`

Body: `type CreateApplication`

Returns: `type Application`

### Get Applications

`GET https://nesto-fe-exam.vercel.app/api/applications`

Returns: `type Application[]`

`GET https://nesto-fe-exam.vercel.app/api/applications/${application.id}`

Returns: `type Application`

### Update Application

Updates the application that matches the ID passed in

`PUT https://nesto-fe-exam.vercel.app/api/applications/${application.id}`

Body: `type Partial<Application>`

Returns: `type Application`

---

### Types

```typescript
export type Product = {
  id: number;
  name: string;
  family: "VALUE_FLEX";
  type: "VARIABLE" | "FIXED";
  term:
    | "1_YEAR"
    | "2_YEAR"
    | "3_YEAR"
    | "4_YEAR"
    | "5_YEAR"
    | "6_YEAR"
    | "7_YEAR"
    | "10_YEAR";
  insurable: boolean;
  insurance: "INSURED" | "CONVENTIONAL";
  prepaymentOption: "STANDARD" | "HELOC";
  restrictionsOption:
    | "NO_RESTRICTIONS"
    | "SOME_RESTRICTIONS"
    | "MORE_RESTRICTIONS";
  restrictions: string;
  fixedPenaltySpread: string;
  helocOption: "HELOC_WITH" | "HELOC_WITHOUT";
  helocDelta: number;
  lenderName: string;
  lenderType: string;
  rateHold: "30_DAYS" | "45_DAYS" | "60_DAYS" | "90_DAYS" | "120_DAYS";
  rate: number;
  ratePrimeVariance: number;
  bestRate: number;
  created: string;
  updated: string;
};

export type Applicant = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Application = {
  readonly id: string;
  token: string;
  type: "NEW" | "RENEWAL" | "REFINANCE";
  applicants: Applicant[];
  productId?: number;
  readonly createdAt: string;
};

export type CreateApplication = {
  productId: number;
};
```

### Example of API using axios

```typescript
import axios from "axios";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-nesto-candidat": "Your Full Name Here",
};

export const api = axios.create({
  baseURL: `https://nesto-fe-exam.vercel.app/api`,
  headers: {
    ...DEFAULT_HEADERS,
  },
  timeout: 25000,
});
```
