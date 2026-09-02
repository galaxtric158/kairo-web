const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Scroll through entire page to trigger all ScrollReveal animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 900;
  let currentScroll = 0;
  
  while (currentScroll < totalHeight) {
    currentScroll += viewportHeight * 0.6;
    await page.evaluate((y) => window.scrollTo(0, y), currentScroll);
    await page.waitForTimeout(300);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  
  // Full page
  await page.screenshot({ path: '.impeccable/review/desktop.png', fullPage: true });
  
  // Hero
  await page.screenshot({ path: '.impeccable/review/hero.png' });
  
  // Scroll to definition section
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/definition.png' });
  
  // Scroll to scale section
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/scale.png' });
  
  // Scroll to architecture section
  await page.evaluate(() => window.scrollTo(0, 2700));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/architecture.png' });
  
  // Scroll to mechanism section
  await page.evaluate(() => window.scrollTo(0, 3600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/mechanism.png' });
  
  // Scroll to implementation section
  await page.evaluate(() => window.scrollTo(0, 4500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/implementation.png' });
  
  // Scroll to current state section
  await page.evaluate(() => window.scrollTo(0, 5400));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/current-state.png' });
  
  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  
  // Mobile scroll through
  const mobileHeight = await page.evaluate(() => document.body.scrollHeight);
  let mobileScroll = 0;
  while (mobileScroll < mobileHeight) {
    mobileScroll += 600;
    await page.evaluate((y) => window.scrollTo(0, y), mobileScroll);
    await page.waitForTimeout(200);
  }
  
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.impeccable/review/mobile-hero.png' });
  await page.screenshot({ path: '.impeccable/review/mobile.png', fullPage: true });
  
  await browser.close();
  console.log('All screenshots captured');
})();
