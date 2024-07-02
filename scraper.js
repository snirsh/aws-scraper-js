import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export const extractJobs = async (event, context) => {
    const BASE_URL = "https://careers.wix.com/positions?page=100"
    let browser;
    try {
        const isLocal = process.env.AWS_EXECUTION_ENV === undefined;

        const browser = isLocal
            // if we are running locally, use the puppeteer that is installed in the node_modules folder
            ? await require('puppeteer').launch()
            // if we are running in AWS, download and use a compatible version of chromium at runtime
            : await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(
                    'https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar',
                ),
                headless: chromium.headless,
            });

        const page = await browser.newPage();

        await page.goto(BASE_URL);

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
        return error.message;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

