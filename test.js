import { extractJobs } from './functions/scraper.js';

extractJobs().then(jobs => console.log(jobs));

