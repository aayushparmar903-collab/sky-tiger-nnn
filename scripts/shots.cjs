/* Screenshot the onexall-vip landing page using installed Chrome (no browser download). */
const { chromium } = require("playwright-core");

const OUT = "C:\\Users\\admin\\onexall-vip\\shots";
const BASE = "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}\\vip-hero.png` });
  console.log("shot vip-hero.png");

  for (const [sel, file] of [
    ["#products", "vip-products.png"],
    ["#why", "vip-why.png"],
    ["#payments", "vip-footer.png"],
  ]) {
    await page.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
      window.scrollBy(0, -40);
    }, sel);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}\\${file}` });
    console.log("shot", file);
  }

  // mobile pass
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}\\vip-mobile.png` });
  console.log("shot vip-mobile.png");

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
