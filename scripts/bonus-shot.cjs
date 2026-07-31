const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.evaluate(() => {
    document.querySelector("#bonuses")?.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy(0, -40);
  });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: "C:/Users/admin/onexall-vip/shots/vip-bonuses.png" });
  console.log("done");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
