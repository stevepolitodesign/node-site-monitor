const sites = require('./lib/sites')
const Response = require('./lib/response')

sites.forEach(site => {
    const { url } = site
    let siteResponse = new Response(url)
    siteResponse.handleResponse()
})