// Logs in to a locally running copy of the app and screenshots the main pages.
import { chromium } from "playwright";

const base = "http://localhost:3000";
const email = process.env.ADMIN_EMAIL;
const password = process.env.PREVIEW_PASSWORD;
const browser = await chromium.launch();
const errors = [];

async function session(name, opts) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${name} console: ${m.text()}`); });
  await page.goto(`${base}/login`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${name}-login.png`, fullPage: true });
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.click("button[type=submit]");
  await page.waitForURL(/dashboard/, { timeout: 20000 });
  const shots = [
    ["home", "/dashboard"],
    ["course", "/phases/1"],
    ["lesson", "/topics/hsw06"],
    ["browse", "/browse"],
  ];
  for (const [label, path] of shots) {
    await page.goto(base + path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${name}-${label}.png`, fullPage: label !== "lesson" });
  }
  // Lesson: practice tab, then scrolled down, then complete-and-continue.
  await page.goto(`${base}/topics/hsw06`);
  await page.waitForLoadState("networkidle");
  await page.getByRole("tab", { name: /Practice/ }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${name}-practice.png`, fullPage: false });
  if (opts.viewport.width < 800) {
    await page.getByRole("button", { name: /Course content/ }).click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${name}-drawer.png` });
    await page.keyboard.press("Escape");
    await page.goto(`${base}/topics/hsw06`);
    await page.waitForLoadState("networkidle");
  }
  await page.locator(".player-nav .btn.primary").click();
  await page.waitForURL(/topics\/hsw07/, { timeout: 15000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${name}-next.png` });
  await ctx.close();
}

await session("desktop", { viewport: { width: 1440, height: 900 } });
await session("mobile", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await session("dark", { viewport: { width: 1280, height: 860 }, colorScheme: "dark" });
await browser.close();
console.log(errors.length ? `PAGE ERRORS:\n${errors.join("\n")}` : "No page errors");
if (errors.some((e) => !e.includes("favicon"))) process.exitCode = 1;
