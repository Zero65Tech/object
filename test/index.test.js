const { sum, add, subtract } = require('../src/index.js');


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

test('.add()', () => {

  expect(add({ a:1, b:2 }, { c:3, d:4 })).toEqual({ a:1, b:2, c:3, d:4 });

  expect(add({ a:1, b:2 }, { b:2, c:3 })).toEqual({ a:1, b:4, c:3 });

  expect(add({ a:{ ax:1 }, b:{ bx:1 } }, { b:{ by:1 }, c:{ cy:1 } })).toEqual({ a:{ ax:1 }, b:{ bx:1, by:1 }, c:{ cy:1 } });

  expect(add({ a:{ ax:1 }, b:{ z:1 } }, { b:{ z:1 }, c:{ cy:1 } })).toEqual({ a:{ ax:1 }, b:{ z:2 }, c:{ cy:1 } });

  expect(add({ a:{ x:1 }, b:{ y:1 } }, { b:{ y:1 }, c:{ z:1 } }, { c:{ z:1 }, d:{} })).toEqual({ a:{ x:1 }, b:{ y:2 }, c:{ z:2 }, d:{} });

});

test('.subtract()', () => {

  expect(subtract({ a:1, b:2 }, { c:3, d:4 })).toEqual({ a:1, b:2, c:-3, d:-4 });

  expect(subtract({ a:1, b:2 }, { b:2, c:3 })).toEqual({ a:1, b:0, c:-3 });

  expect(subtract({ a:{ ax:1 }, b:{ bx:1 } }, { b:{ by:1 }, c:{ cy:1 } })).toEqual({ a:{ ax:1 }, b:{ bx:1, by:-1 }, c:{ cy:-1 } });

  expect(subtract({ a:{ ax:1 }, b:{ z:1 } }, { b:{ z:1 }, c:{ cy:1 } })).toEqual({ a:{ ax:1 }, b:{ z:0 }, c:{ cy:-1 } });

  expect(subtract({ a:{ x:1 }, b:{ y:1 } }, { b:{ y:1 }, c:{ z:1 } }, { c:{ z:1 }, d:{} })).toEqual({ a:{ x:1 }, b:{ y:0 }, c:{ z:-2 }, d:{} });

});
