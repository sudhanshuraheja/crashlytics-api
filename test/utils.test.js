const _ = require('../lib/utils');

console.log = jest.genMockFn(message => message);

test('_.pretty', () => {
  expect(_.pretty({}))
    .toBe('{}');

  expect(_.pretty({ name: 'Sudhanshu', age: '34', cities: ['pune', 'bangalore'] }))
    .toBe('{\n    "name": "Sudhanshu",\n    "age": "34",\n    "cities": [\n        "pune",\n        "bangalore"\n    ]\n}');
});
