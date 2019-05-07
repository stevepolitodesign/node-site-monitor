const data = require('./lib/data');
const Response = require('./lib/response');

data.urls.forEach(url => {
    let site = new Response(url)
    site.handleResponse()
})