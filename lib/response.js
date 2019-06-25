const rp = require("request-promise");
const db = require("./db");
const Screenshot = require("./screenshot");
const Email = require("./email");

class Response {
  constructor(url, emails) {
    this._url = url;
    this.emails = emails;
    this._statusCode = null;
    this._status = null;
    this._lastChecked;
    this.screenshot = this._url ? new Screenshot(this._url) : null;
  }

  getResponse() {
    if (!this._url) {
      throw new Error(`You need to pass Response() a URL`);
    }
    return rp({
      uri: this._url,
      resolveWithFullResponse: true
    })
      .then(response => {
        return response.statusCode;
      })
      .catch(error => {
        console.log(`There was an error getting data for ${this._url}`);
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
          new Email(email, this._url, this._status).compareStatus();
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

  get status() {
    return this._status;
  }

  set status(response) {
    if (response > 199 && response < 400) {
      this._status = "UP";
    } else if (response > 399) {
      this._status = "DOWN";
    }
  }

  get lastChecked() {
    return this._lastChecked;
  }

  set lastChecked(timestamp) {
    this._lastChecked = timestamp;
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
