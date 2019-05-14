const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

class Email {
    constructor(email, url, currentStatus) {
        this.email = email
        this.url = url
        this.currentStatus = currentStatus
    }
    getPreviousStatus() {
        const { status } = db.get('statuses').findLast({ url: this.url }).value();
        return status
    }
    sendEmail(status) {
        if(!status || !this.email) {
            throw new Error(`You need to pass sendEmail() a status and email`)
        }
        status === 'DOWN' ? console.log(`${this.url} is ${status}. Sending email...`) : null;
        status === 'UP' ? console.log(`${this.url} is ${status}. Sending email...`) : null;
    }
    compareStatus() {
        if(!this.currentStatus) {
            throw new Error(`You need to pass Email() a currentStatus`)
        }
        const previousStatus = this.getPreviousStatus()
        if(previousStatus !== this.currentStatus) {
            previousStatus === 'UP' && this.currentStatus === 'DOWN' ? this.sendEmail(this.currentStatus) : null ;
            previousStatus === 'DOWN' && this.currentStatus === 'UP' ? this.sendEmail(this.currentStatus) : null ;
        }
    }
}

module.exports = Email