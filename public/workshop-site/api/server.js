// Workshop sign-up API: receives the form on index.html and saves it to Postgres (RDS).
// Apache forwards /api/ to this process on port 3000. Settings come from /etc/workshop-api.env.
const http = require("http");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // RDS PostgreSQL requires TLS. setup.sh downloads the RDS certificate bundle so it can be verified.
  ssl: process.env.PGSSL === "off" ? false : { rejectUnauthorized: true },
  connectionTimeoutMillis: 5000,
});

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await pool.query(`CREATE TABLE IF NOT EXISTS signups (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`);
  tableReady = true;
}

// Turn low-level errors into a hint a beginner can act on.
function explain(err) {
  const msg = String(err && err.message ? err.message : err);
  const url = process.env.DATABASE_URL || "";
  if (!url || url.includes("YOUR-RDS-ENDPOINT")) {
    return "DATABASE_URL isn't set yet. Edit /etc/workshop-api.env, then run: sudo systemctl restart workshop-api";
  }
  if (/timeout|ETIMEDOUT|ECONNREFUSED/i.test(msg)) return "Can't reach the database. Does db-sg allow port 5432 from web-sg?";
  if (/ENOTFOUND|getaddrinfo/i.test(msg)) return "The database endpoint in /etc/workshop-api.env looks wrong.";
  if (/password authentication failed/i.test(msg)) return "Wrong database username or password in /etc/workshop-api.env.";
  return msg;
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 10_000) reject(new Error("Body too large"));
    });
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); } catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      try {
        await pool.query("SELECT 1");
        return send(res, 200, { api: "ok", db: "ok" });
      } catch (err) {
        return send(res, 200, { api: "ok", db: "error", hint: explain(err) });
      }
    }

    if (req.method === "POST" && url.pathname === "/api/signup") {
      const body = await readJson(req).catch((err) => ({ error: err.message }));
      if (body.error) return send(res, 400, { error: body.error });
      const name = String(body.name || "").trim().slice(0, 100);
      const email = String(body.email || "").trim().slice(0, 200);
      if (!name || !/^[^@\s]+@[^@\s]+$/.test(email)) return send(res, 400, { error: "Enter a name and a valid email." });
      try {
        await ensureTable();
        const { rows } = await pool.query(
          "INSERT INTO signups (name, email) VALUES ($1, $2) RETURNING id, created_at",
          [name, email],
        );
        return send(res, 201, rows[0]);
      } catch (err) {
        return send(res, 503, { error: explain(err) });
      }
    }

    if (req.method === "GET" && url.pathname === "/api/signups") {
      try {
        await ensureTable();
        const { rows } = await pool.query("SELECT id, name, created_at FROM signups ORDER BY id DESC LIMIT 10");
        return send(res, 200, rows);
      } catch (err) {
        return send(res, 503, { error: explain(err) });
      }
    }

    send(res, 404, { error: "Not found" });
  } catch (err) {
    send(res, 500, { error: "Something went wrong" });
    console.error(err);
  }
});

server.listen(PORT, "127.0.0.1", () => console.log(`workshop-api listening on 127.0.0.1:${PORT}`));
