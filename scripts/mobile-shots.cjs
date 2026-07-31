const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: "C:/Users/admin/onexall-vip/shots/m-hero.png" });
  for (const [sel, file] of [
    ["#products", "m-products.png"],
    ["#bonuses", "m-bonuses.png"],
    ["#why", "m-why.png"],
    ["#payments", "m-payments.png"],
  ]) {
    await page.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
      window.scrollBy(0, -70);
    }, sel);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `C:/Users/admin/onexall-vip/shots/${file}` });
  }
  console.log("done");
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
