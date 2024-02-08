const { sum } = require('../src/index.js');


test('.sum()', () => {

  expect(sum({ a:1, b:2 })).toBe(3);
  expect(sum({ a:1, b:2, c:{ d:3, e:4 } })).toBe(10);
  expect(sum({ a:1, b:2, c:{ d:3, e:{ f:4, g:5 } } })).toBe(15);
  expect(sum({ a:1, b:2, c:[ 3, 4, 5 ] })).toBe(15);

  expect(sum({ a:1, b:2, c:{ d:3, e:{ f:4, g:null } } })).toBe(10);
  expect(sum({ a:1, b:2, c:[ 3, 4, null ] })).toBe(10);

  expect(sum({ a:1, b:2, c:{ d:3, e:{ f:4, g:undefined } } })).toBe(10);
  expect(sum({ a:1, b:2, c:[ 3, 4, undefined ] })).toBe(10);

});
