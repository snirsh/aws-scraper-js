import fetch from 'node-fetch'

export const extractJobs = async (event, context) => {
    const BASE_URL = "https://careers.wix.com/positions?page=1000"
    const response = await fetch(BASE_URL)
    const body = await response.text()
    const regex = /<p class="font_3 .*">(.*?)<\/span><\/p>/g
    return Array.from(body.matchAll(regex)).map(match => match[1])
}
