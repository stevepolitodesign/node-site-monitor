const rp = require('request-promise')

class Response {
    constructor(url) {
        this.url = url
        this.statusCode = null
        this.lastChecked
    }

    getResponse() {
        if(!this.url) {
            console.log('Please enter a URL')
            return
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
                this.setLastChecked()
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

    setLastChecked() {
        this.lastChecked = Date.now()
    }

}

module.exports = Response