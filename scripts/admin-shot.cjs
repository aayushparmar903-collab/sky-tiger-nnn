const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/admin", { waitUntil: "networkidle" });
  await page.screenshot({ path: "C:/Users/admin/onexall-vip/shots/vip-admin-login.png" });
  await page.fill("#admin-username", "admin");
  await page.fill("#admin-password", "rayz247");
  await page.click("button[type=submit]");
  await page.waitForURL("**/admin", { timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "C:/Users/admin/onexall-vip/shots/vip-admin.png" });
  console.log("done");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
