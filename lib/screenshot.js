const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer')

class Screenshot {
    constructor(url) {
        this.url = url
        this.domain = new URL(this.url).host
        this.directoryPath = path.join(__dirname,`./../screenshots/${this.domain}`)
    }
    
    makeDirectoy() {
        !fs.existsSync(this.directoryPath) ? fs.mkdirSync(this.directoryPath) : null
    }

    formatTimeStamp(timeStamp) {
        if(!timeStamp) {
            throw new Error(`You need to pass formatTimeStamp() a timeStamp`)
        } 
        return timeStamp.split(' ').join('-').toLowerCase()
    }

    async takeScreenshot() {
        if(!this.url) {
            throw new Error(`You need to pass takeScreenshot() a URL`)
        }
        const timeStamp = new Date()
        const formatTimeStamp = this.formatTimeStamp(timeStamp.toString())
        this.makeDirectoy()
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(this.url);
            await page.screenshot({path: `${this.directoryPath}/${formatTimeStamp}-.png`, fullPage: true});
            await browser.close();
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Screenshot

