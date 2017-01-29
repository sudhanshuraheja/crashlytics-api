const API = require('../lib/fabric');
const conf = require('../fabric.json');

const Fabric = new API(conf.user);

test('API.constructor', () => {
  const fabric = new API({ email: 'man@site.com', password: 'booga' });

  expect(fabric.baseUrl).toBe('https://fabric.io');
  expect(fabric.csrfToken).toBe('');
  expect(fabric.developerToken).toBe('');
  expect(fabric.email).toBe('man@site.com');
  expect(fabric.password).toBe('booga');
});

test('API.url', () => {
  expect(Fabric.url())
    .toBe('https://fabric.io');

  expect(Fabric.url('/login'))
    .toBe('https://fabric.io/login');
});

test('API.load', () => Fabric.load()
    .then(() => expect(Fabric.csrfToken).toBe('load')));
