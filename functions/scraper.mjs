import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const extractJobs = async (event, context) => {
    const BASE_URL = 'https://careers.wix.com/positions?page=100';
    let browser;
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        await page.goto(BASE_URL, { waitUntil: "networkidle0" });

        return await page.evaluate(() => {
            const elements = document.querySelectorAll('div[id^="comp-lbys0nar__"]');
            const jobs = []
            elements.forEach(element => {
                const a_tag = element.querySelector('a');
                const title = element.querySelector('p[class^="font_3 wixui-rich-text__text"]');
                const location = element.querySelector('p[class^="font_8 wixui-rich-text__text"]');
                const link = a_tag.href;
                jobs.push({
                    title: title.innerText,
                    location: location.innerText,
                    link
                });
            })

            return jobs;
        })
    } catch (error) {
        console.error(`Failed to extract jobs: ${error}`);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

