import { Children } from 'react';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/*
 * Given a string, replace every {key} with the data[key] passed. This can be a function returning a
 * string or a raw string. The result will be an array of strings mixed with jsx elements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * Example:
 * template("hola {mundo} cruel {mundo} foo {wadus}", { mundo: () => "<span>mundo</span>", wadus: "foo" })
 *
 */

function insert(arr, index) {
  for (var _len = arguments.length, items = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    items[_key - 2] = arguments[_key];
  }

  return [].concat(_toConsumableArray(arr.slice(0, index)), items, _toConsumableArray(arr.slice(index)));
}

var flat = function flat(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
};

var replace = function replace(result, match, data) {
  for (var index = 1; index < result.length; index += 2) {
    var datum = data[match];
    var item = typeof datum === 'function' ? datum() : datum;
    result = insert(result, index, item);
  }

  return result;
};

var index = (function (locale) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var str = [locale];
  Object.keys(data).forEach(function (key) {
    var re = new RegExp('{' + key + '}', 'g');
    str = flat(str).map(function (x) {
      var arr = x.split(re);
      var result = replace(arr, key, data);
      return result;
    });
  });
  var children = flat(str).filter(function (s) {
    return !!s;
  });
  return Children.map(children, function (child) {
    return child;
  });
});

export default index;
//# sourceMappingURL=index.es.js.map
