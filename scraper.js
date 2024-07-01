import fetch from 'node-fetch'
import { load } from 'cheerio'

const BASE_URL = "https://careers.wix.com/positions?page=100"

export const extractJobs = async (event, context) => {
    const response = await fetch(BASE_URL)
    const body = await response.text()
    const $ = load(body)
    return $('.font_3').map((i, el) => $(el).text()).get()
}
