const cheerio = require('cheerio');

class Parser {

  static getCSRFToken(page) {
    let token = '';
    const $ = cheerio.load(page);
    $('html head meta').each((index, element) => {
      if ($(element).attr('name') === 'csrf-token') {
        token = $(element).attr('content').toString();
      }
    });
    return token;
  }

}

module.exports = Parser;
