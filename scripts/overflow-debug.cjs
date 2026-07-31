const { chromium } = require("playwright-core");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const wide = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 1 || r.right > vw + 1 || r.left < -1) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" && el.className.toString().includes("vignette")) return;
        wide.push({
          tag: el.tagName,
          cls: el.className.toString().slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    });
    return {
      vw,
      scrollW: document.documentElement.scrollWidth,
      bodyScrollW: document.body.scrollWidth,
      wide: wide.slice(0, 25),
    };
  });
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
