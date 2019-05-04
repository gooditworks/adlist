const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const firstFrame = await page.$('iframe[name*="google_ads"]')
    const file = firstFrame ? await firstFrame.screenshot({ type, quality, fullPage }) : false;
    await browser.close();
    return file;
}

module.exports = { getScreenshot };