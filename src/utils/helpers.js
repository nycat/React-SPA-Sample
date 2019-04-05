export function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

export function clean(source) {
  var propNames = Object.getOwnPropertyNames(source);
  const target = {};
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (source[propName]) {
      target[propName] = source[propName];
    }
  }
  return target;
}

export function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
