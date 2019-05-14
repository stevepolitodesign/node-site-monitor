const sites = require('./lib/sites')
const Response = require('./lib/response')

sites.forEach(site => {
    const { url, emails } = site
    let siteResponse = new Response(url, emails)
    siteResponse.handleResponse()
})