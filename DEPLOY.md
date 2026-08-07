# ONEXALL.VIP — Hostinger Deployment

## What you need

A **Hostinger VPS** (any plan) with Ubuntu. This is a Node.js app — it will
NOT run on Hostinger shared/Premium/Business web hosting, those have no
Node.js runtime. On a VPS it takes ~10 minutes.

## 1. Install Node.js 20 LTS on the VPS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs
node -v   # should print v20.x
```

## 2. Upload and unpack

Upload `onexall-vip-hostinger.zip` to the VPS (scp or the Hostinger file
manager over SSH), then:

```bash
sudo mkdir -p /var/www/onexall-vip
sudo unzip onexall-vip-hostinger.zip -d /var/www/onexall-vip
cd /var/www/onexall-vip
```

## 3. Install production dependencies (pre-built — no build step needed)

```bash
npm ci --omit=dev
```

## 4. Set the admin secret (recommended)

```bash
sudo tee /etc/systemd/system/onexall-vip.service <<'EOF'
[Unit]
Description=ONEXALL.VIP landing page
After=network.target

[Service]
WorkingDirectory=/var/www/onexall-vip
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=0.0.0.0
# CHANGE THIS to any long random string:
Environment=ADMIN_SECRET=change-me-to-a-long-random-string

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now onexall-vip
sudo systemctl status onexall-vip
```

## 5. Point the domain

In Hostinger: point `onexall.vip` A-record to your VPS IP. Then put Nginx
in front for port 80/443 + free SSL:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo tee /etc/nginx/sites-available/onexall <<'EOF'
server {
    listen 80;
    server_name onexall.vip www.onexall.vip;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/onexall /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d onexall.vip -d www.onexall.vip
```

## 6. Admin panel

- URL: `https://onexall.vip/admin`
- Default login: **admin / rayz247**
- FIRST THING after login: use the **Security** box at the bottom of the
  panel to set your own username + password.
- From the same panel you can switch the 6 product cards on/off live.

## Notes

- Product visibility is saved in `product-settings.json`; admin credentials
  (hashed) in `admin-credentials.json` — both live next to the app and
  survive restarts.
- On **Vercel** the filesystem is read-only, so those two files are stored in
  a Vercel Blob store instead. Create one in the Vercel dashboard
  (Storage → Create → Blob), connect it to the project so
  `BLOB_READ_WRITE_TOKEN` is set, then redeploy.
- If you ever change code: `npm install && npm run build`, then
  `sudo systemctl restart onexall-vip`.
