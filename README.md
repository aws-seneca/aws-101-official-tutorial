# AWS 101 Study Guide

The AWS Student Builder Group at Seneca's study notes, published at https://aws-seneca.github.io/aws-101-official-tutorial/.

- **Lesson 1: Web server and RDS**: AWS's official tutorial, [Create a web server and an Amazon RDS DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/TUT_WebAppWithRDS.html), step by step: an EC2 instance on Amazon Linux 2023, an RDS PostgreSQL database, and Apache with PHP serving AWS's `SamplePage.php`. Adapted for students (region, `t3.micro`, EC2 Instance Connect, PostgreSQL, a simple password), with annotated console screenshots, extensions, a stuck list, and teardown.
- **Lesson 2: App to RDS**: the hands-on AWS 101 workshop (October 7, 2026). Deploy [aws-seneca/aws-101-workshop](https://github.com/aws-seneca/aws-101-workshop) to EC2, then move its data to RDS with one line of configuration.
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

## Screenshots

[`public/shots/`](public/shots) holds Lesson 1's console screenshots, from a dry run with account numbers, addresses and endpoints painted out: orange for what to click, green for a value that is already right, red where the dry run made a different choice from the lesson. That dry run used MySQL, `us-east-1`, and SSH with a key pair, and never reached a working `SamplePage.php`, so the five red-labelled shots should be retaken on the lesson's settings.

Built with [Fumadocs](https://fumadocs.dev) on Next.js. Lesson 1 started as a single-page React site; that version is in the git history at `d88559a`.
