const assert = require('assert');



exports.from = (objArr, key) => {
  return objArr.reduce((map, obj) => { map[obj[key]] = obj; return map; }, {});
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
      ret[key] = this.sortDeep(obj[key], ...sortOrders);
    else
      ret[key] = obj[key];
  }

  return ret;

}



exports.pluck = (obj, heads) => {
  return heads.map(head => obj[head]);
}

exports.pluckAll = (objArr, heads) => {
  return objArr.map(obj => heads.map(head => obj[head]));
}
