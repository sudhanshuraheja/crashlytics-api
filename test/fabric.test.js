const API = require('../lib/fabric');

const conf = require('../fabric.json');
Fabric = new API(conf.user)

test('API.url', () => {

  expect(Fabric.url())
    .toBe('https://fabric.io')

  expect(Fabric.url('/login'))
    .toBe('https://fabric.io/login')
})
