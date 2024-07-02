import { extractJobs } from './functions/scraper.mjs';

extractJobs().then(jobs => console.log(jobs));

