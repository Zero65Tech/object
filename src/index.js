const assert = require('assert');
const _ = require('lodash');



exports.from = (objArr, key) => {
  return objArr.reduce((map, obj) => { map[obj[key]] = obj; return map; }, {});
}



exports.nav = (obj, path, fn, ret = {}, ...params) => {
  
  if(!path.length)
    return fn(...params, obj, ret);
  
  if(typeof obj != 'object')
    return;

  let keys = Object.keys(obj);
  if(typeof path[0] == 'string')
    keys = keys.filter(key => key == path[0]);
  else
    keys = keys.filter(key => key.match(path[0]));

  keys.forEach(key => exports.nav(obj[key], path.slice(1), fn, ret, ...params, key));

  return ret;

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

exports.sort = (obj, sortOrder) => {

  let keys = obj instanceof Array ? obj : Object.keys(obj);

  if(sortOrder)
    keys.sort((a, b) => a == b ? 0 : (sortOrder.indexOf(a) < sortOrder.indexOf(b) ? -1 : 1));
  else
    keys.sort();    

  if(obj instanceof Array)
    return;

  for(let key of keys) {
    let temp = obj[key];
    delete obj[key];
    obj[key] = temp;
  }

  return obj; // TODO: Remove

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

exports.add = (object, ...sources) => {

  object = _.cloneDeep(object);

  _.mergeWith(object, ...sources, (val1, val2) => {

    if(typeof val1 === 'object' && typeof val2 === 'object')
      return undefined;

    if(val1 === undefined || val1 === null)
      return val2;

    if(val2 === undefined || val2 === null)
      return val1;

    return val1 + val2;

  });

  return object;

}

exports.subtract = (object, ...sources) => {

  object = _.cloneDeep(object);

  _.mergeWith(object, ...sources, (val1, val2) => {

    if(typeof val1 === 'object' || typeof val2 === 'object')
      return undefined;

    if(val1 === undefined || val1 === null)
      return -val2;

    if(val2 === undefined || val2 === null)
      return val1;

    return val1 - val2;

  });

  return object;

}



exports.addAt = (object, path, value) => {
  _.update(object, path, node => (node || 0) + value);
}

exports.pushAt = (object, path, value) => {
  _.update(object, path, node => {
    node = node || [];
    node.push(value);
    return node;
  });
}

exports.updateAll = (obj, path, fn) => {
  
  if(typeof obj != 'object')
    return;

  let keys = Object.keys(obj);
  if(typeof path[0] == 'string')
    keys = keys.filter(key => key == path[0]);
  else
    keys = keys.filter(key => key.match(path[0]));

  if(path.length > 1)
    keys.forEach(key => exports.updateAll(obj[key], path.slice(1), fn));
  else
    keys.forEach(key => obj[key] = fn(obj[key]));

}
