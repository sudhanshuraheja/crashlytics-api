"use strict"

let request = require('request')
let cheerio = require('cheerio')

class API {

  constructor() {
    this.baseUrl = "https://fabric.io"
  }

  url(resource) {
    return this.baseUrl + resource
  }

  login() {
    request( this.url("/login"), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let parser = new Parser()
        console.log( parser.getCSRFToken(body) )
      }
    })
  }

}

class Parser {

  getCSRFToken(page) {
    let token = ""
    let $ = cheerio.load(page)
    $("html head meta").each((index, element) => {
      if( $(element).attr('name') == "csrf-token" ) {
        token = $(element).attr('content')
      }
    })
    return token
  }

}

module.exports = API
