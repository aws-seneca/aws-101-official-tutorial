# AWS 101 Study Guide

The AWS Student Builder Group at Seneca's study site, published at https://aws-seneca.github.io/aws-101-official-tutorial/.

- **Workshop**: the hands-on AWS 101 session (October 7, 2026). Deploy [aws-seneca/aws-101-workshop](https://github.com/aws-seneca/aws-101-workshop) to EC2, then move its data to RDS with one line of configuration.
- **Concepts**: study notes on EC2, security groups and VPC, RDS, IAM, S3, and costs.
- **Architecture**: the same app from one server to a managed database, a load-balanced fleet, and serverless.

Concept and architecture pages start as outlines; club members fill them in.

## Write or edit a page

Pages are MDX files in [`content/docs`](content/docs). Each folder's `meta.json` sets the sidebar order. Full guide: the site's **Contributing** page.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static site in out/
```

Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`), which builds with `BASE_PATH=/aws-101-official-tutorial`.

Built with [Fumadocs](https://fumadocs.dev) on Next.js. The earlier version of this site, which followed AWS's official PHP tutorial, is in the git history.
