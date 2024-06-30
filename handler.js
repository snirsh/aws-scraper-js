import { extractJobs } from './scraper.js';

export const getWixJobs = async (event, context, callback) => {
    try {
        const jobs = await extractJobs(event, context)
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
