// Start the CLI Manager
const program = require('commander');
const _ = require('./lib/utils');
const Fabric = require('./lib/fabric');

// Read Package.json and Config
const pkg = require('./package.json');
const conf = require('./fabric.json');

program
  .version(pkg.version)
  .option('-h, --help', 'Help')
  .parse(process.argv);

// TODO : Move to promises, this is sad
const fabric = new Fabric(conf.user);
fabric.login((user) => {
  _.pretty(user.organizations);
});
