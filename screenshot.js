const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot-hero3.png' });
  
  // Scroll down to capture sections below the fold
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section2.png' });
  
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section3.png' });
  
  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section4.png' });
  
  await page.evaluate(() => window.scrollTo(0, 5500));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section5.png' });

  await page.evaluate(() => window.scrollTo(0, 7000));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section6.png' });

  await page.evaluate(() => window.scrollTo(0, 8500));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshot-section7.png' });

  await browser.close();
})();
