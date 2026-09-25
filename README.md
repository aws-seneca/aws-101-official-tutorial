# AWS 101 Workshop

AWS 101 workshop from the AWS Student Builder Group at Seneca Polytechnic, Wednesday, October 7, 2026.

Attendees build a real web app in the AWS Console by following AWS's official tutorial, [Create a web server and an Amazon RDS DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/TUT_WebAppWithRDS.html): an EC2 instance on Amazon Linux 2023, an RDS PostgreSQL database, and Apache with PHP serving AWS's `SamplePage.php`, which saves to the database. Teams then extend it, and everyone deletes their resources before leaving.

The workshop is guided in person. This repo is the companion site at https://aws-seneca.github.io/aws-101-official-tutorial/, which carries the whole walkthrough rather than only linking to it:

- A diagram of what gets built, and the two security-group rules that make it work
- Every step of all three parts, with the console values to type and the commands ready to copy
- A progress tracker across the three parts, saved in the browser
- Annotated screenshots of each console screen
- The five places the day differs from the tutorial text (region, `t3.micro` instead of `t2.micro`, EC2 Instance Connect instead of an SSH key, PostgreSQL, a simple password)
- The team challenge, what to do when stuck, teardown steps, and how the AWS free plan works since July 2025

All the text lives in [`lib/content.ts`](lib/content.ts). The screenshots in [`public/shots/`](public/shots) come from a dry run of the workshop, with account numbers, addresses and endpoints painted out and the thing to look at marked: orange for what to click, green for a value that is already right, red where the dry run made a different choice from the one we make on the day.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` publishes to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow sets `BASE_PATH`, which the config also exposes to the client as `NEXT_PUBLIC_BASE_PATH` so links to files in `public/` resolve under the repo path.

## Before the event

- **Re-run the dry run on the workshop settings.** The current screenshots were taken on MySQL, in `us-east-1`, over SSH with a key pair. The workshop runs PostgreSQL, in `ca-central-1`, over EC2 Instance Connect, and the dry run never reached a working `SamplePage.php`. Five screenshots are labelled in red because of this and should be retaken.
- Re-check https://aws.amazon.com/free/ and the tutorial itself. AWS updates both.
