import chromium from 'chrome-aws-lambda'

export const extractJobs = async (event, context) => {
    const BASE_URL = "https://careers.wix.com/positions?page=100"
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    const page = await browser.newPage();

    await page.goto(BASE_URL);

    const jobs = [];

    await page.evaluate(() => {
        const elements = document.querySelectorAll('a[aria-label="see position"]');


        elements.forEach(element => {
            jobs.push({
                title: element.closest('p[class^="font_3"]').innerText,
                location: element.closest('p[class^="font_8"]').innerText,
                link: element.href
            });
        })
    })

    return jobs
}

