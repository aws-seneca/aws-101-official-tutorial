#!/bin/bash
# Installs the workshop sign-up API behind Apache on Amazon Linux 2023.
# Run on your instance:  curl -fsSL <this file's URL> -o setup.sh && sudo bash setup.sh
set -euo pipefail

BASE="https://raw.githubusercontent.com/aws-seneca/aws-101-workshop/main/public/workshop-site/api"
APP=/opt/workshop-api

echo "1/5 Installing Node.js 20"
dnf install -y nodejs20
NODE=$(command -v node-20 || command -v node)
NPM=$(command -v npm-20 || command -v npm)

echo "2/5 Downloading the API"
mkdir -p "$APP"
curl -fsSL "$BASE/server.js" -o "$APP/server.js"
curl -fsSL "$BASE/package.json" -o "$APP/package.json"
(cd "$APP" && "$NPM" install --omit=dev --no-audit --no-fund)

echo "3/5 Downloading the RDS certificate bundle, so the connection to RDS is encrypted and verified"
curl -fsSL https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -o "$APP/rds-ca.pem"

echo "4/5 Creating the settings file and the service"
if [ ! -f /etc/workshop-api.env ]; then
  cat > /etc/workshop-api.env <<'ENVFILE'
# Fill this in from the RDS console (Connectivity & security), then run:
#   sudo systemctl restart workshop-api
# Use a password with only letters and numbers, or it needs URL-encoding.
DATABASE_URL=postgres://USERNAME:PASSWORD@YOUR-RDS-ENDPOINT:5432/postgres
ENVFILE
fi
chmod 600 /etc/workshop-api.env

cat > /etc/systemd/system/workshop-api.service <<UNIT
[Unit]
Description=AWS 101 workshop sign-up API
After=network-online.target

[Service]
ExecStart=$NODE $APP/server.js
EnvironmentFile=/etc/workshop-api.env
Environment=NODE_EXTRA_CA_CERTS=$APP/rds-ca.pem
DynamicUser=yes
Restart=on-failure

[Install]
WantedBy=multi-user.target
UNIT

echo "5/5 Pointing Apache's /api/ at the service"
cat > /etc/httpd/conf.d/workshop-api.conf <<'PROXY'
ProxyPass        /api/ http://127.0.0.1:3000/api/
ProxyPassReverse /api/ http://127.0.0.1:3000/api/
PROXY

systemctl daemon-reload
systemctl enable --now workshop-api
systemctl restart httpd

echo
echo "Done. Next:"
echo "  1. sudo nano /etc/workshop-api.env   (put in your RDS endpoint, username and password)"
echo "  2. sudo systemctl restart workshop-api"
echo "  3. curl localhost/api/health          (want: \"db\":\"ok\")"
