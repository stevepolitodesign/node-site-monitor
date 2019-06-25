const rp = require("request-promise");
const db = require("./db");
const Screenshot = require("./screenshot");
const Email = require("./email");

class Response {
  constructor(url, emails) {
    this.url = url;
    this.emails = emails;
    this._statusCode = null;
    this.status = null;
    this.lastChecked;
    this.screenshot = this.url ? new Screenshot(this.url) : null;
  }

  getResponse() {
    if (!this.url) {
      throw new Error(`You need to pass Response() a URL`);
    }
    return rp({
      uri: this.url,
      resolveWithFullResponse: true
    })
      .then(response => {
        return response.statusCode;
      })
      .catch(error => {
        console.log(`There was an error getting data for ${this.url}`);
      });
  }

  handleResponse() {
    this.getResponse()
      .then(response => {
        this.setStatusCode(response);
        this.setStatus(response);
        this.setLastChecked(Date.now());
        return response;
      })
      .then(response => {
        if (!this.emails) {
          return response;
        }
        this.emails.forEach(email => {
          new Email(email, this.url, this.status).compareStatus();
        });
        return response;
      })
      .then(response => {
        this.updateDate(this);
      })
      .catch(error => {
        console.log(error);
      });
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(response) {
    this._statusCode = response;
  }

  set status(response) {
    if (!response) {
      return;
    }
    if (response > 199 && response < 400) {
      this.status = "UP";
    } else if (response > 399) {
      this.status = "DOWN";
    }
  }

  set lastChecked(timestamp) {
    this.lastChecked = timestamp;
  }

  updateDate({ url, statusCode, status, lastChecked }) {
    db.get("statuses")
      .push({
        url,
        statusCode,
        status,
        lastChecked
      })
      .write();
  }
}

module.exports = Response;
