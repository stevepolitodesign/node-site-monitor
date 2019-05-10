const rp = require('request-promise')
const Screenshot = require('./screenshot')

class Response {
    constructor(url) {
        this.url = url
        this.statusCode = null
        this.status = null
        this.lastChecked
        this.screenshot = new Screenshot(this.url)
    }

    getResponse() {
        if(!this.url) {
            throw new Error(`You need to pass Response() a URL`)
        }
        return rp({
                uri: this.url,
                resolveWithFullResponse: true
            })
            .then(response => {
                return response.statusCode
            })
            .catch(error => {
                console.log(`There was an error getting data for ${this.url}`)
            })
    }

    handleResponse() {
        this.getResponse()
            .then(response => {
                this.setStatusCode(response)
                this.setStatus(response)
                this.setLastChecked()
                this.screenshot.takeScreenshot()
            })
            .catch(error => {
                console.log(error)
            }) 
    }

    setStatusCode(response) {
        if(!response) {
            return
        }
        this.statusCode = response
    }

    setStatus(response) {
        if(!response) {
            return
        }
        if(response > 199 && response < 400) {
            this.status = 'UP'
        } else if ( response > 399) {
            this.status = 'DOWN'
        }
    }

    setLastChecked() {
        this.lastChecked = Date.now()
    }

}

module.exports = Response