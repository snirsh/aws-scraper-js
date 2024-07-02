import {extractJobs} from "./scraper.mjs";

export const getWixJobs = async (event, context) => {
    try {
        const jobs = await extractJobs();
        return {
            statusCode: 200,
            body: JSON.stringify(jobs)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }


};
