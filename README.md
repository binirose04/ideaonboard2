# IDEA StatiCa Onboarding React Project

Converted from the supplied standalone HTML onboarding portal into a Vite React project.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Modes

- Full mode: `/`
- Embed mode: `/?embed=1`

Embed mode hides the header, keeps the language bar and footer actions sticky, and posts `{ type: "gsd-onboarding-height", height }` to the parent frame.

## Assets

The original HTML referenced image files but the actual image binaries were not attached. Placeholder assets are included under `public/assets/` using the same filenames. Replace these files with your final brand/screenshots before deployment.

Required original asset filenames:

- `idea.PNG`
- `gsd.PNG`
- `licover.jpeg`
- `lidp.jpeg`
- `step1.jpeg`
- `step2.jpeg`
- `step3.jpeg`

## Important integration note

The email collection step still submits to the same Google Form endpoint from the HTML. For production, move this behind an API route if you need logging, validation, rate limiting, or better failure handling.
