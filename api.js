"use strict"

let request = require('request').defaults({jar: true})
let cheerio = require('cheerio')
let querystring = require('querystring');

require('request-debug')(request);

class API {

  constructor(user) {
    this.baseUrl = "https://fabric.io"
    this.csrfToken = ""
    this.developerToken = ""
    this.email = user.email
    this.password = user.password
  }

  getToken() {
    return this.csrfToken
  }

  getDeveloperToken() {
    return this.developerToken
  }

  getOpts(path) {
    return {
      url: this.url("/api/v2/client_boot/config_data"),
      headers: {
        'X-CSRF-Token': this.csrfToken,
        'X-CRASHLYTICS-DEVELOPER-TOKEN': this.developerToken,
      }
    }
  }

  url(resource) {
    return this.baseUrl + resource
  }

  load(done) {
    request( this.url("/login"), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let parser = new Parser()
        this.csrfToken = parser.getCSRFToken(body)
      }
      done()
    })
  }

  configData(done) {
    request(this.getOpts("/api/v2/client_boot/config_data"), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)
        this.developerToken = data.developer_token
      }
      done()
    })
  }

  login(done) {
    request({
      url: this.url("/api/v2/session"),
      method: 'POST',
      headers: {
        'X-CSRF-Token': this.csrfToken,
        'X-CRASHLYTICS-DEVELOPER-TOKEN': this.developerToken,
      },
      form: {
        'email': this.email,
        'password': this.password,
      },
    }, (error, response, body) => {
      done()
    })
  }

}

class Parser {

  getCSRFToken(page) {
    let token = ""
    let $ = cheerio.load(page)
    $("html head meta").each((index, element) => {
      if( $(element).attr('name') == "csrf-token" ) {
        token = $(element).attr('content').toString()
      }
    })
    return token
  }

}

module.exports = API
