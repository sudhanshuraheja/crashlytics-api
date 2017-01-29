class _ {

  static pretty(json) {
    console.log(JSON.stringify(json, null, 4));
    return JSON.stringify(json, null, 4);
  }

}

module.exports = _;
