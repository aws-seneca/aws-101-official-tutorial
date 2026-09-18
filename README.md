# AWS 101 Workshop

Hands-on AWS 101 workshop from the AWS Student Builder Group at Seneca Polytechnic, Wednesday, October 7, 2026.

In 90 minutes, every attendee launches a server on Amazon EC2, loads a page from it in their own browser, extends it with a team (up to connecting an RDS PostgreSQL database), and tears it all down before leaving.

This repo holds:

- **The workshop guide**, a small Next.js site: step-by-step guide, team challenge, troubleshooting, cost and teardown, and an organizers page with the runbook's open decisions.
- **The base project** at [`public/workshop-site/index.html`](public/workshop-site/index.html). Each attendee's EC2 instance downloads this file at boot through the user data script in the guide.

## Pages

| Route | What it covers |
|---|---|
| `/` | Overview, the 90-minute timeline, what gets built, what to do before you come |
| `/guide/` | Region, the five service categories, launching EC2 with user data, creating an RDS database |
| `/challenge/` | Four add-ons worth 7 points, with hints |
| `/troubleshooting/` | What breaks, in the order it breaks |
| `/cost/` | The free plan as it works since July 2025, and the teardown steps |
| `/organizers/` | What changed from the first draft, open decisions, roles, the cut list |

Content lives in [`lib/content.ts`](lib/content.ts), so updating a step means editing one array.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Pushing to `main` builds a static export and publishes it to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). In the repo settings, set **Pages → Source** to **GitHub Actions** once.

## Before the event

- Check `REPO` in `lib/content.ts` matches this repository, so the user data script downloads the right `index.html`.
- Re-check the free plan details at https://aws.amazon.com/free/. The facts here were checked on 2026-09-18.
- Do a full dry run on a brand-new AWS account.
