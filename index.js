"use strict"

// Start the CLI Manager
const program = require('commander')

// Read Package.json and Config
const pkg = require('./package.json')
const conf = require('./fabric.json')

console.log(conf.user)

program
  .version(pkg.version)
  .option('-h, --help', 'Help')
  .parse(process.argv)

// Load up the API
let API = require("./api")

// TODO : Move to promises, this is sad
let api = new API(conf.user)
api.load(() => {
  api.configData(() => {
    api.login(() => {

    })
  })
})
