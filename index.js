"use strict"

// Start the CLI Manager
const program = require('commander')
const _ = require('./lib/utils')

// Read Package.json and Config
const pkg = require('./package.json')
const conf = require('./fabric.json')

program
  .version(pkg.version)
  .option('-h, --help', 'Help')
  .parse(process.argv)

// Load up the API
let Fabric = require("./lib/fabric")

// TODO : Move to promises, this is sad
let fabric = new Fabric(conf.user)
fabric.login((user) => {
  _.pretty(user.organizations)
})
