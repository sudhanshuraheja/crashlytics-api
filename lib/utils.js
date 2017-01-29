const color = require('colors-cli');

class _ {

  static pretty(json) {
    console.log(JSON.stringify(json, null, 4));
    return JSON.stringify(json, null, 4);
  }

  static startMockServerError(err) {
    console.log(color.red('\n\n\n*** YOU NEED TO START THE MOCK SERVER [npm run mock] ***\n\n\n'));
    console.log(err);
  }

}

module.exports = _;
