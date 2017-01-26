"use strict"

function getUserDetails() {

  let email
  let password

  if ( process.argv.length < 6 ) {
    errorAndExit("node index --email abc@xyz.com --password test1234")
  }

  if (
    (process.argv[2] == '--email') ||
    (process.argv[2] == '-e')
  ) {
    email = process.argv[3]
  }

  if (
    (process.argv[4] == '--password') ||
    (process.argv[4] == '-p')
  ) {
    password = process.argv[5]
  }

  if ( !email || !password ) {
    errorAndExit("node index --email abc@xyz.com --password test1234")
  }

  return {
    email: email,
    password: password
  }
}

function errorAndExit(message) {
  console.log(message)
  process.exit(1)
}

module.exports = getUserDetails
