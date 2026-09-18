# AWS 101 Workshop

AWS 101 workshop from the AWS Student Builder Group at Seneca Polytechnic, Wednesday, October 7, 2026.

Attendees build a real web app in the AWS Console by following AWS's official tutorial, [Create a web server and an Amazon RDS DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/TUT_WebAppWithRDS.html): an EC2 instance on Amazon Linux 2023, an RDS PostgreSQL database, and Apache with PHP serving AWS's `SamplePage.php`, which saves to the database. Teams then extend it, and everyone deletes their resources before leaving.

The workshop is guided in person. This repo is the one-page companion site at https://aws-seneca.github.io/aws-101-workshop/:

- A link to each part of the official tutorial
- The five places the day differs from the tutorial text (region, `t3.micro` instead of `t2.micro`, EC2 Instance Connect instead of an SSH key, PostgreSQL, a simple password)
- The team challenge
- What to do when stuck
- Teardown steps
- How the AWS free plan works since July 2025

All the text lives in [`lib/content.ts`](lib/content.ts).

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` publishes to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Before the event

- Walk the tutorial end to end on a brand-new free-plan account, with the changes listed on the page.
- Re-check https://aws.amazon.com/free/ and the tutorial itself. AWS updates both.
