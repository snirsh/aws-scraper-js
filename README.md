# JS Scraping example
## Introduction
This is a simple example of how to scrape a website using JavaScript.
I didn't implement anything too complex so that you'll have a skeleton to work with and experiment.

The main scraper is in the `scraper.js` file. It uses the `requests` and parses the HTML using regex.
This could've been done using a library like `cheerio` but I wanted to keep it simple.

The `index.js` file is the entry point of the application. It uses the `scraper.js` to scrape the website and then saves the data to a file.

## What's SAM?
AWS SAM is a framework for developing and deploying serverless applications. It's an open-source framework that you can use to build serverless applications on AWS.
You can check the `template.yaml` file to see how the resources are defined.

