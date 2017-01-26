"use strict"

// Read CLI to figure out the login and password
let user = require('./cli')()

// Load up the API
let API = require("./api")

// TODO : Move to promises, this is sad
let api = new API(user)
api.load(() => {
  api.configData(() => {
    api.login(() => {

    })
  })
})
