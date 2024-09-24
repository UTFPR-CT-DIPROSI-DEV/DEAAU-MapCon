//
// Este arquivo é usado para realizar capturas de tela de uma página da web.
// Ele é chamado pelo(s) arquivo(s): "pages/api/mapcon/migra.ts"
//
const puppeteer = require("puppeteer");

async function takeScreenshot(url, img_name) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto(url, {
        waitUntil: 'networkidle2',
    });
    await page.screenshot({
        path: `public/images/news/${img_name}.jpeg`,
        fullPage: true,
        type: 'jpeg',
    });
    await browser.close();
}

takeScreenshot(process.argv[2], process.argv[3]);
  