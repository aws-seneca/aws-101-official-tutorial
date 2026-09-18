export const EVENT = {
  name: "AWS 101 Workshop",
  group: "AWS Student Builder Group @ Seneca Polytechnic",
  date: "Wednesday, October 7, 2026",
  length: "90 minutes",
  format: "In person, hands-on",
  region: "ca-central-1",
  regionLabel: "Canada (Central)",
};

const RDS_GUIDE = "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide";

// The official AWS tutorial the workshop follows, part by part.
export const TUTORIAL = {
  title: "Tutorial: Create a web server and an Amazon RDS DB instance",
  href: `${RDS_GUIDE}/TUT_WebAppWithRDS.html`,
  parts: [
    { title: "Launch an EC2 instance", href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.LaunchEC2.html`, what: "A virtual server running Amazon Linux 2023, with a security group that lets web traffic in." },
    { title: "Create an Amazon RDS DB instance", href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.CreateDBInstance.html`, what: "A managed PostgreSQL database. The console wires its security group so only your server can reach it." },
    { title: "Install a web server on your EC2 instance", href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.CreateWebServer.html`, what: "Apache and PHP, plus AWS's SamplePage.php: a form that saves to the database and lists what's there." },
  ],
};

// Where the day deliberately differs from the tutorial text, and why.
export const DIFFERENCES: { step: string; tutorial: string; today: string; why: string }[] = [
  { step: "Region", tutorial: "Any region", today: "Canada (Central), ca-central-1", why: "Everyone in the same place, so helpers can find your resources. If something “disappears”, check the region first." },
  { step: "Instance type", tutorial: "t2.micro", today: "t3.micro", why: "Accounts created on or after July 15, 2025 get free-plan credits for t3.micro, not t2.micro." },
  { step: "Key pair and SSH", tutorial: "Create a key pair, SSH from My IP", today: "Proceed without a key pair. Allow SSH from anywhere (0.0.0.0/0)", why: "We connect with EC2 Instance Connect in the browser. It needs port 22 open to AWS's service, which “My IP” blocks. Fine for 90 minutes; never in production." },
  { step: "Database engine", tutorial: "MariaDB, MySQL or PostgreSQL", today: "PostgreSQL", why: "One engine for the whole room. Follow the PostgreSQL tabs in each part." },
  { step: "Master password", tutorial: "Any password", today: "Letters and numbers only", why: "Spaces and quotes break the PHP connection string in the sample page." },
];

export type AddOn = { points: number; title: string; body: string; href?: string; link?: string };

// Team challenge, once SamplePage.php saves data.
export const ADD_ONS: AddOn[] = [
  { points: 1, title: "Make the page yours", body: "Edit SamplePage.php: a real title, your team name, some CSS. Refresh and the data is still there, because it lives in RDS, not on the page." },
  { points: 1, title: "Add a second page", body: "Create about.php (or .html) in /var/www/html and link to it from the sample page." },
  { points: 2, title: "Read the security groups", body: "In the EC2 and RDS consoles, find the rule that lets your server reach the database on port 5432. Explain to a helper why your laptop can't connect to the database directly." },
  { points: 2, title: "Query the database yourself", body: "From the instance, connect with psql and SELECT the rows you added through the page.", href: `${RDS_GUIDE}/USER_ConnectToPostgreSQLInstance.psql.html`, link: "Connecting with psql" },
  { points: 2, title: "Give the instance a role", body: "Create an S3 bucket, attach an IAM role to the instance, and read a file from it with the AWS CLI, with no access keys anywhere.", href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html", link: "IAM roles for EC2" },
];

export const STUCK: { symptom: string; fix: string }[] = [
  { symptom: "My instance or database disappeared", fix: "Wrong region. Top right of the console → Canada (Central)." },
  { symptom: "t3.micro doesn't say free tier eligible", fix: "Check the region. Older accounts (before July 2025) are on the legacy free tier; t3.micro still works and costs cents." },
  { symptom: "The public IP won't load", fix: "Use http:// (not https://) and the Public IPv4 address. Then check the instance's security group has an HTTP rule." },
  { symptom: "EC2 Instance Connect fails", fix: "The SSH rule is set to My IP, or the instance is still starting. Allow SSH from anywhere, wait for 2/2 checks." },
  { symptom: "dnf can't find php-pgsql or postgresql15", fix: "The instance isn't Amazon Linux 2023. Run cat /etc/system-release; relaunch with the AL2023 AMI." },
  { symptom: "SamplePage.php says “Failed to connect to PostgreSQL”", fix: "Check the endpoint (no port), username, password and database name “sample” in /var/www/inc/dbinfo.inc. Then check the RDS security group allows 5432 from the EC2 security group." },
  { symptom: "The page shows PHP source code instead of running", fix: "PHP isn't installed or Apache wasn't restarted: sudo systemctl restart httpd." },
];

export const TEARDOWN = [
  "RDS → Databases → select tutorial-db-instance → Actions → Delete. Untick “Create final snapshot” and “Retain automated backups”, tick the acknowledgement, type delete me.",
  "EC2 → Instances → select your instance → Instance state → Terminate.",
  "If you did the role add-on: empty and delete the S3 bucket.",
  "Refresh both pages. Deleting and Terminated mean you're done.",
];

export const LINKS = [
  { label: TUTORIAL.title, href: TUTORIAL.href },
  { label: "Deleting a DB instance", href: `${RDS_GUIDE}/USER_DeleteInstance.html` },
  { label: "Terminate an EC2 instance", href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html" },
  { label: "Connect with EC2 Instance Connect", href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-eic.html" },
  { label: "AWS Free Tier", href: "https://aws.amazon.com/free/" },
  { label: "AWS Certified Cloud Practitioner", href: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
];
