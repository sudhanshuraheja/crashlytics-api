"use strict"

const EventEmitter = require('events');
const request = require('request').defaults({jar: true})
const querystring = require('querystring');
const Parser = require('./parser')

// require('request-debug')(request);

class API extends EventEmitter {

  constructor(user) {
    super()
    this.baseUrl = "https://fabric.io"
    this.csrfToken = ""
    this.developerToken = ""
    this.email = user.email
    this.password = user.password
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
    request({
      url: this.url("/api/v2/client_boot/config_data"),
      headers: {
        'X-CSRF-Token': this.csrfToken,
        'X-CRASHLYTICS-DEVELOPER-TOKEN': this.developerToken,
      }
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)
        this.developerToken = data.developer_token
      }
      done()
    })
  }

  session(done) {
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
      done(JSON.parse(body))
    })
  }

  login(done) {
    this.load(() => {
      this.configData(() => {
        this.session((data) => {
          done(data)
        })
      })
    })
  }

}

module.exports = API
