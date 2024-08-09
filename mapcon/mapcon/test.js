const puppeteer = require('puppeteer');

console.log('1');
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/', {
        waitUntil: 'networkidle2',
    });
    console.log('2');
    await page.screenshot({
        path: 'ss.jpeg',
        fullPage: true,
        type: 'jpeg',
    });

    await browser.close();
  })();
console.log('3');