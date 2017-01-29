const API = require('../lib/fabric');
const conf = require('../fabric.json');
const _ = require('../lib/utils');


test('API.constructor', () => {
  const Fabric = new API({ email: 'man@site.com', password: 'booga' });

  expect(Fabric.baseUrl).toBe('https://fabric.io');
  expect(Fabric.csrfToken).toBe('');
  expect(Fabric.developerToken).toBe('');
  expect(Fabric.email).toBe('man@site.com');
  expect(Fabric.password).toBe('booga');
});

test('API.url', () => {
  const Fabric = new API(conf.user);

  expect(Fabric.url())
    .toBe('https://fabric.io');

  expect(Fabric.url('/login'))
    .toBe('https://fabric.io/login');
});

test('API.load', () => {
  const Fabric = new API(conf.user);
  Fabric.baseUrl = 'http://localhost:3000';

  return Fabric
    .load()
    .then(() => {
      expect(Fabric.csrfToken).toBe('bgl4Zsg1O3skIOmmb9NKiDBtCtg/wLe7mAd6n9My0Eo=');
    });
});
