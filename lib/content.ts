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
const EC2_GUIDE = "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide";

export const TUTORIAL = {
  title: "Tutorial: Create a web server and an Amazon RDS DB instance",
  href: `${RDS_GUIDE}/TUT_WebAppWithRDS.html`,
};

// Where the day deliberately differs from the tutorial text, and why.
export const DIFFERENCES: { step: string; tutorial: string; today: string; why: string }[] = [
  {
    step: "Region",
    tutorial: "Any region",
    today: `${EVENT.regionLabel}, ${EVENT.region}`,
    why: "Everyone in the same place, so helpers can find your resources. If something “disappears”, check the region first.",
  },
  {
    step: "Instance type",
    tutorial: "t2.micro",
    today: "t3.micro",
    why: "Accounts created on or after July 15, 2025 get free-plan credits for t3.micro, not t2.micro.",
  },
  {
    step: "Key pair and SSH",
    tutorial: "Create a key pair, SSH from My IP",
    today: "Proceed without a key pair. Allow SSH from anywhere (0.0.0.0/0)",
    why: "We connect with EC2 Instance Connect in the browser. It needs port 22 open to AWS's service, which “My IP” blocks. Fine for 90 minutes; never in production.",
  },
  {
    step: "Database engine",
    tutorial: "MariaDB, MySQL or PostgreSQL",
    today: "PostgreSQL",
    why: "One engine for the whole room. Follow the PostgreSQL tabs in each part; everything on this page is already the PostgreSQL version.",
  },
  {
    step: "Master password",
    tutorial: "Any password",
    today: "Letters and numbers only",
    why: "The PostgreSQL connection string in the sample page is separated by spaces, so a space or a quote in the password breaks it.",
  },
];

export type Shot = { src: string; w: number; h: number; caption: string };

export type Step = {
  do: string;
  detail?: string;
  code?: string;
  expect?: string;
  fields?: { label: string; value: string; note?: string }[];
  shots?: Shot[];
};

const shot = (src: string, w: number, h: number, caption: string): Shot => ({ src: `/shots/${src}.webp`, w, h, caption });

export const SHOT_NOTE =
  "The screenshots are from a dry run of this workshop. Account numbers, addresses and endpoints are painted out. Where the dry run made a different choice from ours, the red label says so.";

export const BROKEN_PAGE_SHOT = shot("17-page-broken", 1500, 822, "SamplePage.php loaded but only the heading rendered: PHP stopped at the database connection. Check /var/www/inc/dbinfo.inc.");

export type Part = {
  id: string;
  n: number;
  title: string;
  short: string;
  href: string;
  what: string;
  minutes: string;
  steps: Step[];
  checkpoint: string;
};

const DBINFO = `<?php

define('DB_SERVER', 'your-db-endpoint');
define('DB_USERNAME', 'tutorial_user');
define('DB_PASSWORD', 'your master password');
define('DB_DATABASE', 'sample');
?>`;

// AWS's SamplePage.php, PostgreSQL version, copied from the tutorial.
const SAMPLE_PAGE = `<?php include "../inc/dbinfo.inc"; ?>

<html>
<body>
<h1>Sample page</h1>
<?php

/* Connect to PostgreSQL and select the database. */
$constring = "host=" . DB_SERVER . " dbname=" . DB_DATABASE . " user=" . DB_USERNAME . " password=" . DB_PASSWORD ;
$connection = pg_connect($constring);

if (!$connection){
 echo "Failed to connect to PostgreSQL";
 exit;
}

/* Ensure that the EMPLOYEES table exists. */
VerifyEmployeesTable($connection, DB_DATABASE);

/* If input fields are populated, add a row to the EMPLOYEES table. */
$employee_name = htmlentities($_POST['NAME']);
$employee_address = htmlentities($_POST['ADDRESS']);

if (strlen($employee_name) || strlen($employee_address)) {
  AddEmployee($connection, $employee_name, $employee_address);
}

?>

<!-- Input form -->
<form action="<?PHP echo $_SERVER['SCRIPT_NAME'] ?>" method="POST">
  <table border="0">
    <tr>
      <td>NAME</td>
      <td>ADDRESS</td>
    </tr>
    <tr>
      <td>
    <input type="text" name="NAME" maxlength="45" size="30" />
      </td>
      <td>
    <input type="text" name="ADDRESS" maxlength="90" size="60" />
      </td>
      <td>
    <input type="submit" value="Add Data" />
      </td>
    </tr>
  </table>
</form>
<!-- Display table data. -->
<table border="1" cellpadding="2" cellspacing="2">
  <tr>
    <td>ID</td>
    <td>NAME</td>
    <td>ADDRESS</td>
  </tr>

<?php

$result = pg_query($connection, "SELECT * FROM EMPLOYEES");

while($query_data = pg_fetch_row($result)) {
  echo "<tr>";
  echo "<td>",$query_data[0], "</td>",
       "<td>",$query_data[1], "</td>",
       "<td>",$query_data[2], "</td>";
  echo "</tr>";
}
?>
</table>

<!-- Clean up. -->
<?php

  pg_free_result($result);
  pg_close($connection);
?>
</body>
</html>

<?php

/* Add an employee to the table. */
function AddEmployee($connection, $name, $address) {
   $n = pg_escape_string($name);
   $a = pg_escape_string($address);
   echo "Forming Query";
   $query = "INSERT INTO EMPLOYEES (NAME, ADDRESS) VALUES ('$n', '$a');";

   if(!pg_query($connection, $query)) echo("<p>Error adding employee data.</p>");
}

/* Check whether the table exists and, if not, create it. */
function VerifyEmployeesTable($connection, $dbName) {
  if(!TableExists("EMPLOYEES", $connection, $dbName))
  {
     $query = "CREATE TABLE EMPLOYEES (
         ID serial PRIMARY KEY,
         NAME VARCHAR(45),
         ADDRESS VARCHAR(90)
       )";

     if(!pg_query($connection, $query)) echo("<p>Error creating table.</p>");
  }
}
/* Check for the existence of a table. */
function TableExists($tableName, $connection, $dbName) {
  $t = strtolower(pg_escape_string($tableName)); //table name is case sensitive
  $d = pg_escape_string($dbName); //schema is 'public' instead of 'sample' db name so not using that

  $query = "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$t';";
  $checktable = pg_query($connection, $query);

  if (pg_num_rows($checktable) >0) return true;
  return false;

}
?>`;

export const PARTS: Part[] = [
  {
    id: "part-1",
    n: 1,
    title: "Launch an EC2 instance",
    short: "EC2 instance",
    href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.LaunchEC2.html`,
    what: "A virtual server running Amazon Linux 2023, with a security group that lets web traffic in.",
    minutes: "10 minutes",
    steps: [
      {
        do: "Open the EC2 console and check the region",
        detail: `Top right of the console must read ${EVENT.regionLabel}. Every resource you create lives in one region only. Then choose Launch instance.`,
        shots: [
          shot("01-console-home", 1500, 823, "Console Home. The region selector is top right; switch it before you make anything."),
          shot("02-find-ec2", 1500, 826, "Search is the fastest way to any service. EC2 is virtual servers."),
          shot("03-ec2-dashboard", 1500, 826, "The EC2 dashboard. Launch instance is in the middle."),
        ],
      },
      {
        do: "Fill in the launch form",
        detail: "Leave every field not listed here at its default.",
        fields: [
          { label: "Name", value: "tutorial-ec2-instance-web-server" },
          { label: "Application and OS Images", value: "Amazon Linux 2023 AMI", note: "Under Amazon Linux. The quick-start default." },
          { label: "Instance type", value: "t3.micro", note: "Tutorial says t2.micro. Use t3.micro." },
          { label: "Key pair (login)", value: "Proceed without a key pair", note: "We connect through the browser instead." },
        ],
        shots: [
          shot("04-choose-ami", 1500, 835, "Amazon Linux 2023 is already selected under Quick Start. Leave it."),
          shot("05-type-and-key", 1500, 826, "The dry run left the tutorial's defaults here. Change both: t3.micro, and no key pair."),
        ],
      },
      {
        do: "Set Network settings",
        detail: "Three switches, all in the same box.",
        fields: [
          { label: "Allow SSH traffic from", value: "Anywhere 0.0.0.0/0", note: "Not My IP. EC2 Instance Connect comes from AWS, not from your laptop." },
          { label: "Allow HTTPS traffic from the internet", value: "On" },
          { label: "Allow HTTP traffic from the internet", value: "On", note: "This is the one that lets your browser reach the page." },
        ],
        shots: [shot("06-network-settings", 1500, 826, "SSH from Anywhere, and both web traffic switches on.")],
      },
      {
        do: "Choose Launch instance, then wait",
        detail: "Open Instances and select yours. You want Instance state: Running and Status check: 2/2 checks passed. It takes a minute or two.",
        shots: [shot("07-launch-success", 1500, 828, "The green banner means the instance is starting, not ready. Open Instances and watch the state.")],
      },
      {
        do: "Copy the Public IPv4 address",
        detail: "Details tab, Instance summary. You will paste it into your browser twice today. It is the address of your server on the public internet.",
        shots: [shot("08-instance-details", 1500, 828, "Instance summary. Public IPv4 address is the one you want; the private one (172.31.x.x) is not reachable from your laptop.")],
      },
    ],
    checkpoint: "Instance is Running with 2/2 checks passed, and the Public IPv4 address is on your clipboard or written down.",
  },
  {
    id: "part-2",
    n: 2,
    title: "Create an Amazon RDS DB instance",
    short: "RDS database",
    href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.CreateDBInstance.html`,
    what: "A managed PostgreSQL database. The console wires its security group so only your server can reach it.",
    minutes: "10 minutes of clicking, then 5 to 10 minutes of waiting",
    steps: [
      {
        do: "Open the RDS console, same region",
        detail: `${EVENT.regionLabel} again. Databases in the left nav, then Create database, then Standard create.`,
        shots: [
          shot("09-find-rds", 1500, 827, "RDS is listed as Aurora and RDS."),
          shot("10-rds-nav", 279, 871, "Databases, in the left nav."),
        ],
      },
      {
        do: "Engine and template",
        fields: [
          { label: "Engine options", value: "PostgreSQL" },
          { label: "Templates", value: "Free tier", note: "Free plan accounts see Free tier. Paid plan accounts see Sandbox instead. Pick whichever you have." },
          { label: "Availability and durability", value: "Leave as is" },
        ],
        shots: [shot("11-engine-options", 1500, 822, "Plain PostgreSQL, the one with the elephant. Aurora is a different, pricier product.")],
      },
      {
        do: "Settings",
        detail: "Type these exactly. The sample page has the username and the database name hard-coded.",
        fields: [
          { label: "DB instance identifier", value: "tutorial-db-instance" },
          { label: "Master username", value: "tutorial_user" },
          { label: "Auto generate a password", value: "Off" },
          { label: "Master password", value: "Letters and numbers only", note: "No spaces, no quotes. Write it down; you cannot read it back later." },
        ],
        shots: [shot("12-db-settings", 1500, 824, "The identifier and username must match exactly. Self managed lets you type the password the sample page will use.")],
      },
      {
        do: "Instance configuration and storage",
        fields: [
          { label: "Instance class", value: "Burstable classes (includes t classes) → db.t3.micro" },
          { label: "Storage", value: "Leave every default" },
        ],
        shots: [shot("14-instance-class", 1500, 823, "Burstable classes, db.t3.micro. Storage stays at whatever the Free tier template gives you.")],
      },
      {
        do: "Connectivity: this is the step that matters",
        detail: "This is where the database gets a security group rule that lets your server in, and nothing else. Skip it and the sample page will never connect.",
        fields: [
          { label: "Compute resource", value: "Connect to an EC2 compute resource" },
          { label: "EC2 instance", value: "tutorial-ec2-instance-web-server", note: "The instance you launched in Part 1." },
          { label: "Database authentication", value: "Password authentication" },
        ],
        shots: [shot("13-connect-to-ec2", 1500, 751, "Connect to an EC2 compute resource, then pick your instance. RDS creates the security group rules for you.")],
      },
      {
        do: "Open Additional configuration and set the database name",
        detail: "It is collapsed, near the bottom, and easy to miss.",
        fields: [{ label: "Initial database name", value: "sample", note: "Lowercase. Without this there is no database for the page to use." }],
      },
      {
        do: "Choose Create database, then start Part 3 while it builds",
        detail: "Status goes Creating for several minutes. You do not need it yet. Go to Part 3 and come back at the dbinfo.inc step.",
      },
      {
        do: "When Status is Available, copy the endpoint",
        detail: "Choose the database name, then Connectivity & security. The endpoint looks like tutorial-db-instance.abc123.ca-central-1.rds.amazonaws.com. Copy it without the :5432 port.",
        shots: [shot("15-db-endpoint", 1500, 824, "Connectivity & security. Copy the endpoint only, never the port. Yours shows 5432 because it is PostgreSQL.")],
      },
    ],
    checkpoint: "Status is Available, the endpoint is copied without the port, and the master password is written down.",
  },
  {
    id: "part-3",
    n: 3,
    title: "Install a web server on your EC2 instance",
    short: "Web server",
    href: `${RDS_GUIDE}/CHAP_Tutorials.WebServerDB.CreateWebServer.html`,
    what: "Apache and PHP, plus AWS's SamplePage.php: a form that saves to the database and lists what's there.",
    minutes: "25 minutes",
    steps: [
      {
        do: "Connect to the instance in your browser",
        detail: "EC2 → Instances → select yours → Connect → the EC2 Instance Connect tab → Connect. A black terminal opens in a new tab. The tutorial uses SSH and a key file; we do not need either.",
      },
      {
        do: "Update the instance",
        code: "sudo dnf update -y",
        expect: "Either a list of updates, or Nothing to do. Both are fine.",
      },
      {
        do: "Install Apache, PHP and the PostgreSQL client",
        code: "sudo dnf install -y httpd php php-pgsql postgresql15",
        expect: "Complete! at the end. If dnf says it cannot find php-pgsql, the instance is not Amazon Linux 2023: run cat /etc/system-release and relaunch.",
        shots: [shot("16-install-complete", 849, 311, "The tail of a successful install. Yours lists php-pgsql and postgresql15 instead of the MariaDB packages shown here.")],
      },
      {
        do: "Start Apache, and make it start on every boot",
        code: "sudo systemctl start httpd\nsudo systemctl enable httpd",
        expect: "enable prints a line about creating a symlink.",
      },
      {
        do: "Check it in your browser",
        detail: "Go to http://<your public IPv4> — http, not https, and no path. You should get the Apache test page. That page only shows while /var/www/html is empty, so it disappears later. That is normal.",
      },
      {
        do: "Give yourself permission to edit the web root",
        code: "sudo usermod -a -G apache ec2-user",
        detail: "Group membership only applies to a new login. Close the Instance Connect tab and connect again from the console.",
      },
      {
        do: "Back in a fresh terminal, confirm the group and fix the permissions",
        code:
          "groups\nsudo chown -R ec2-user:apache /var/www\nsudo chmod 2775 /var/www\nfind /var/www -type d -exec sudo chmod 2775 {} \\;\nfind /var/www -type f -exec sudo chmod 0664 {} \\;",
        expect: "groups prints apache in the list: ec2-user adm wheel apache systemd-journal. If it does not, you are still in the old session.",
      },
      {
        do: "Create the database credentials file, outside the web root",
        code: "cd /var/www\nmkdir inc\ncd inc\n>dbinfo.inc\nnano dbinfo.inc",
        detail: "It lives in /var/www/inc, not /var/www/html, so the web server can read it but nobody can load it in a browser.",
      },
      {
        do: "Paste this into nano, with your own endpoint and password",
        code: DBINFO,
        detail: "Paste with Ctrl+V (Cmd+V on a Mac). Replace your-db-endpoint with the RDS endpoint from Part 2 and your master password with your password. Save and close with Ctrl+S then Ctrl+X.",
      },
      {
        do: "Create the page itself",
        code: "cd /var/www/html\n>SamplePage.php\nnano SamplePage.php",
      },
      {
        do: "Paste AWS's sample page, PostgreSQL version",
        code: SAMPLE_PAGE,
        detail: "Copy this whole block. It is the PostgreSQL version from the tutorial, unchanged. Save and close: Ctrl+S then Ctrl+X.",
      },
      {
        do: "Open it",
        detail: "http://<your public IPv4>/SamplePage.php. Type a name and an address, choose Add Data, and the row appears in the table below the form.",
        expect: "The words Forming Query appear at the top after you add a row. That is a stray echo in AWS's own code, not a bug you caused.",
      },
    ],
    checkpoint: "You added a name and an address through the form and it shows in the table. Refresh the page: the row is still there, because it is in RDS, not in the page.",
  },
];

export type AddOn = { points: number; title: string; body: string; href?: string; link?: string };

// Team challenge, once SamplePage.php saves data.
export const ADD_ONS: AddOn[] = [
  { points: 1, title: "Make the page yours", body: "Edit SamplePage.php: a real title, your team name, some CSS. Refresh and the data is still there, because it lives in RDS, not on the page." },
  { points: 1, title: "Delete the stray echo", body: "Find echo \"Forming Query\"; in AddEmployee and remove the line. Reload and add a row: the text is gone. You just patched AWS's sample code." },
  { points: 1, title: "Add a second page", body: "Create about.php (or .html) in /var/www/html and link to it from the sample page." },
  { points: 2, title: "Read the security groups", body: "In the EC2 and RDS consoles, find the rule that lets your server reach the database on port 5432. Explain to a helper why your laptop can't connect to the database directly." },
  { points: 2, title: "Query the database yourself", body: "From the instance, connect with psql and SELECT the rows you added through the page.", href: `${RDS_GUIDE}/USER_ConnectToPostgreSQLInstance.psql.html`, link: "Connecting with psql" },
  { points: 2, title: "Give the instance a role", body: "Create an S3 bucket, attach an IAM role to the instance, and read a file from it with the AWS CLI, with no access keys anywhere.", href: `${EC2_GUIDE}/iam-roles-for-amazon-ec2.html`, link: "IAM roles for EC2" },
];

export const STUCK: { symptom: string; fix: string }[] = [
  { symptom: "My instance or database disappeared", fix: `Wrong region. Top right of the console → ${EVENT.regionLabel}.` },
  { symptom: "t3.micro doesn't say free tier eligible", fix: "Check the region. Older accounts (before July 2025) are on the legacy free tier; t3.micro still works and costs cents." },
  { symptom: "The public IP won't load", fix: "Use http:// (not https://) and the Public IPv4 address. Then check the instance's security group has an HTTP rule." },
  { symptom: "EC2 Instance Connect fails", fix: "The SSH rule is set to My IP, or the instance is still starting. Allow SSH from anywhere, wait for 2/2 checks." },
  { symptom: "I get the Apache test page, not my page", fix: "The test page only shows while /var/www/html is empty. Add /SamplePage.php to the address." },
  { symptom: "groups doesn't list apache", fix: "The usermod only takes effect in a new login. Close the Instance Connect tab and connect again." },
  { symptom: "dnf can't find php-pgsql or postgresql15", fix: "The instance isn't Amazon Linux 2023. Run cat /etc/system-release; relaunch with the AL2023 AMI." },
  { symptom: "SamplePage.php says “Failed to connect to PostgreSQL”", fix: "Check the endpoint (no :5432), username tutorial_user, your password and database name sample in /var/www/inc/dbinfo.inc. A space in the password also breaks it. Then check the database is Available and that you used Connect to an EC2 compute resource in Part 2." },
  { symptom: "The page shows PHP source code instead of running", fix: "PHP isn't installed or Apache wasn't restarted: sudo systemctl restart httpd." },
  { symptom: "The page prints “Forming Query”", fix: "Nothing is wrong. It is a leftover echo in AWS's sample code. Deleting it is worth a point in the challenge." },
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
  { label: "Terminate an EC2 instance", href: `${EC2_GUIDE}/terminating-instances.html` },
  { label: "Connect with EC2 Instance Connect", href: `${EC2_GUIDE}/connect-linux-inst-eic.html` },
  { label: "AWS Free Tier", href: "https://aws.amazon.com/free/" },
  { label: "AWS Certified Cloud Practitioner", href: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
];
