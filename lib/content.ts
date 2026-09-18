export const REPO = "aws-seneca/aws-101-workshop";
export const SITE_URL = `https://raw.githubusercontent.com/${REPO}/main/public/workshop-site/index.html`;

export const EVENT = {
  name: "AWS 101 Workshop",
  group: "AWS Student Builder Group @ Seneca Polytechnic",
  date: "Wednesday, October 7, 2026",
  length: "90 minutes",
  format: "In person, hands-on",
  region: "ca-central-1",
  regionLabel: "Canada (Central)",
};

export type Phase = { from: number; to: number; name: string; short: string; tone: string };

export const PHASES: Phase[] = [
  { from: 0, to: 10, name: "Arrival and account check", short: "Accounts", tone: "var(--p0)" },
  { from: 10, to: 12, name: "Framing", short: "", tone: "var(--p1)" },
  { from: 12, to: 22, name: "Five service categories", short: "Map", tone: "var(--p1)" },
  { from: 22, to: 30, name: "Architecture decisions", short: "Design", tone: "var(--p1)" },
  { from: 30, to: 50, name: "Guided build: EC2", short: "Build EC2", tone: "var(--p2)" },
  { from: 50, to: 58, name: "Database setup", short: "RDS", tone: "var(--p3)" },
  { from: 58, to: 78, name: "Team challenge", short: "Challenge", tone: "var(--p3)" },
  { from: 78, to: 85, name: "Teardown, never cut", short: "Teardown", tone: "var(--p4)" },
  { from: 85, to: 90, name: "Close", short: "", tone: "var(--p5)" },
];

export const USER_DATA = `#!/bin/bash
dnf install -y nginx
curl -fsSL "${SITE_URL}" -o /usr/share/nginx/html/index.html
sed -i "s/YOUR-NAME/Your Name Here/" /usr/share/nginx/html/index.html
systemctl enable --now nginx`;

export const LAUNCH_STEPS: { title: string; detail: string }[] = [
  { title: "EC2 → Launch instance", detail: "Check the region in the top right says Canada (Central) first." },
  { title: "Name it", detail: "Something personal, like yourname-workshop. Thirty identical names are impossible to debug." },
  { title: "Amazon Linux 2023", detail: "The default AMI." },
  { title: "Instance type t3.micro", detail: "It should say free tier eligible." },
  { title: "Proceed without a key pair", detail: "The browser connection used later doesn't need one." },
  { title: "Allow SSH and allow HTTP from the internet", detail: "This creates a security group. These two ticks are the only reason anyone can reach your instance." },
  { title: "Advanced details → User data", detail: "Paste the script below and change “Your Name Here”." },
  { title: "Launch, then open the public IP", detail: "Wait for 2/2 checks passed, copy the Public IPv4 address, and open http://<that address>." },
];

export const DB_STEPS: { title: string; detail: string }[] = [
  { title: "RDS → Create database → Standard create", detail: "One person per team." },
  { title: "Engine: PostgreSQL, template: Free tier", detail: "Single-AZ, db.t3.micro or db.t4g.micro." },
  { title: "Identifier, username, password", detail: "Write the password down. In production it would live in Secrets Manager." },
  { title: "Connectivity: connect to an EC2 compute resource", detail: "Pick your instance. AWS creates security groups so only your instance can reach port 5432. This is networking, not IAM." },
  { title: "Public access: No. Create", detail: "It takes several minutes. It will be ready for the challenge." },
];

export const TEARDOWN = [
  "EC2 → Instances → select yours → Instance state → Terminate",
  "RDS → Databases → select → Actions → Delete. Untick “create final snapshot” and “retain automated backups”, tick the acknowledgement, type delete me",
  "If you did add-on 4: empty the S3 bucket, then delete it",
  "Refresh both pages. Terminated or Deleting is correct",
];

export type AddOn = { n: number; points: number; title: string; body: string; done: string };

export const ADD_ONS: AddOn[] = [
  { n: 1, points: 3, title: "Talk to the database", body: "From your instance, connect to your RDS database, create a table, insert a row, and read it back.", done: "A helper sees your SELECT return your row." },
  { n: 2, points: 1, title: "Make it look good", body: "Edit the site's HTML and CSS on the server.", done: "A helper loads your page and agrees it's better." },
  { n: 3, points: 1, title: "Add a second page", body: "An about.html, or a thanks.html the form links to.", done: "Both pages load from your public IP." },
  { n: 4, points: 2, title: "Give the instance a role", body: "Upload a file to S3, attach an IAM role to the instance, and read the file from the instance with no keys stored on it.", done: "aws s3 cp works from the instance." },
];

export const TROUBLE: { symptom: string; cause: string; fix: string }[] = [
  { symptom: "No account, or can't sign in", cause: "Signup unfinished, or the card was declined", fix: "Pair with a teammate now" },
  { symptom: "“My instance disappeared”", cause: "Wrong region", fix: "Top right → Canada (Central)" },
  { symptom: "t3.micro isn't marked free tier eligible", cause: "An older account on the legacy free tier, or the wrong region", fix: "Check the region. On older accounts it still works and costs cents" },
  { symptom: "The page won't load", cause: "The security group has no HTTP rule", fix: "Instance → Security tab → edit inbound rules → add HTTP from anywhere" },
  { symptom: "Still won't load, the rule looks right", cause: "Using the private IP, or the browser is forcing https://", fix: "Use the public IPv4 and type http:// explicitly" },
  { symptom: "nginx's default page, or a blank page", cause: "Still booting, or a typo in user data", fix: "Wait two minutes. If still wrong, check user data and relaunch" },
  { symptom: "EC2 Instance Connect fails", cause: "No SSH rule, or the instance is still starting", fix: "Add SSH (port 22) inbound, wait for 2/2 checks" },
  { symptom: "psql hangs", cause: "The RDS security group doesn't allow 5432 from the EC2 security group", fix: "Add that rule, with the EC2 security group as the source" },
  { symptom: "psql: password authentication failed", cause: "Wrong username or password", fix: "Check the master username in the RDS configuration tab; reset the password if needed" },
  { symptom: "aws s3 cp: unable to locate credentials", cause: "No role on the instance yet", fix: "Attach the role, wait a minute, retry" },
];

export const CHANGES: { area: string; before: string; after: string; why: string }[] = [
  { area: "Instance type", before: "t2.micro", after: "t3.micro", why: "Accounts created on or after 2025-07-15 get free-plan credits for t3.micro, t3.small, t4g.micro, t4g.small, c7i-flex.large and m7i-flex.large. t2.micro isn't on the list." },
  { area: "Account model", before: "“Set up a Free Tier account”", after: "“Create an account on the free plan”", why: "The twelve-month free tier became a credits model: $100 at signup, up to $100 more, and the account closes after six months or when credits run out." },
  { area: "IAM", before: "“Without IAM, any service can talk to any other”", after: "AWS denies by default. IAM decides who can call which API", why: "The original was inverted." },
  { area: "EC2 to RDS", before: "An IAM decision", after: "A security group decision", why: "Reaching RDS on port 5432 is network access. The console's connect-to-RDS feature works by editing security groups." },
  { area: "Database add-on", before: "Form submissions save to the database", after: "psql: create a table, insert and read a row", why: "The base site is static HTML. Saving a form needs backend code, which is a different workshop." },
  { area: "Domain add-on", before: "Custom domain with Route 53", after: "IAM role reading from S3", why: "Domains cost money, DNS is slow, and the IP dies at teardown. The role add-on is free and makes IAM concrete." },
  { area: "Teardown", before: "None", after: "Seven minutes, never cut", why: "Forgotten instances and databases burn students' credits." },
  { area: "Setup", before: "Apache installed over SSH", after: "User data sets it up at boot", why: "SSH is where beginners fall behind. This way everyone reaches a working page." },
  { area: "Time", before: "No time for account problems", after: "Ten minutes at the start", why: "People who can't sign in are the likeliest way this event fails." },
];

export const DECISIONS: { what: string; rec: string; by: string }[] = [
  { what: "In person or online", rec: "In person. Workshops lose the most over video", by: "Week of Sep 22" },
  { what: "90 minutes", rec: "Yes. Cut scope, not time", by: "Now" },
  { what: "How attendees get accounts", rec: "Personal free-plan accounts in advance, with Learner Lab or locked-down club users as fallback", by: "Sep 26" },
  { what: "Region", rec: "ca-central-1, Canada (Central)", by: "Before the dry run" },
  { what: "Presenter and helpers", rec: "One presenter, three helpers minimum", by: "Week of Sep 28" },
  { what: "Prize", rec: "Something real and confirmed", by: "Oct 2" },
];

export const SOURCES = [
  { label: "Launch an EC2 instance: free-plan instance types", href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/LaunchingAndUsingInstances.html" },
  { label: "Amazon RDS free tier", href: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" },
  { label: "Connect an EC2 instance to an RDS database", href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tutorial-connect-ec2-instance-to-rds-database.html" },
  { label: "Troubleshoot EC2 Instance Connect", href: "https://repost.aws/knowledge-center/ec2-instance-connect-troubleshooting" },
  { label: "AWS Free Tier", href: "https://aws.amazon.com/free/" },
];
