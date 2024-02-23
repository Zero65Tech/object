const assert = require('assert');
const _ = require('lodash');



exports.from = (objArr, key) => {
  return objArr.reduce((map, obj) => { map[obj[key]] = obj; return map; }, {});
}



exports.trim = (obj) => {
  for(let [ key, value ] of Object.entries(obj)) {

    if(typeof value != 'object') {

      if(value === undefined || value === '' || value === 0)
        delete obj[key];

    } else if(value === null) {

      delete obj[key];

    } else if(value instanceof Array) {

      if(value.length == 0)
        delete obj[key];

    } else {

      exports.trim(obj[key]);

      if(Object.keys(value).length == 0)
        delete obj[key];

    }

  }
}

exports.sum = (obj) => {

  let values = obj instanceof Array ? obj : Object.values(obj);

  return values.reduce((sum, val) => {
    if(typeof val == 'number')
      return sum + val;
    else if(val === undefined || val === null)
      return sum;
    else
      return sum + exports.sum(val);
  }, 0);

}

exports.sort = (obj, sortOrder) => {

  let keys = Object.keys(obj);

  if(sortOrder)
    keys.sort((a, b) => a == b ? 0 : (sortOrder.indexOf(a) < sortOrder.indexOf(b) ? -1 : 1));
  else
    keys.sort();

  let ret = {};
  for(let key of keys)
    ret[key] = obj[key];

  return ret;

}

exports.sortDeep = (obj, ...sortOrders) => {

  if(!sortOrders.length)
    return obj;

  let sortOrder = sortOrders[0];
  sortOrders = sortOrders.slice(1);

  let keys = Object.keys(obj);
  if(sortOrder)
    keys.sort((a, b) => a == b ? 0 : (sortOrder.indexOf(a) < sortOrder.indexOf(b) ? -1 : 1));
  else // if(sortOrder == null)
    keys.sort();

  let ret = {};
  for(let key of keys) {
    if(typeof obj[key] == 'object')
      ret[key] = exports.sortDeep(obj[key], ...sortOrders);
    else
      ret[key] = obj[key];
  }

  return ret;

}



exports.add = (obj1, obj2) => {

  let obj = {};

  let keys = _.union(Object.keys(obj1), Object.keys(obj2));

  keys.forEach(key => {

    let val1 = obj1[key];
    let val2 = obj2[key];

    if(val1 === undefined || val1 === null) {

      if(val2 === undefined || val2 === null )
        return;
      else if(typeof val2 == 'object')
        obj[key] = _.cloneDeep(val2);
      else
        obj[key] = val2;

    } else if(val2 === undefined || val2 === null) {

      if(val1 === undefined || val1 === null)
        return;
      else if(typeof val1 == 'object')
        obj[key] = _.cloneDeep(val1);
      else
        obj[key] = val1;

    } else if(typeof val1 == 'object' && typeof val2 == 'object') {

      obj[key] = exports.add(val1, val2);

    } else {

      obj[key] = val1 + val2;

    }

  });

  return obj;

}
