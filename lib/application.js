"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBasicProps = createBasicProps;
exports.camelCaseTransformerFn = camelCaseTransformerFn;
exports.formateListObj = formateListObj;
exports.scanActiveIndex = scanActiveIndex;

function createBasicProps(key, styleObj, classNameArr) {
  var obj = {
    key: key,
    className: '',
    style: {}
  };
  classNameArr.map(function (className) {
    obj['className'] = obj['className'].concat(' ', className);
    Object.assign(obj['style'], styleObj[className]);
  });
  return obj;
}

function camelCaseTransformerFn(orinal_name) {
  var newName = '';
  newName = orinal_name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return newName;
}

function formateListObj(data) {
  var obj = {
    name: '',
    children: []
  };
  Object.keys(data).map(function (key) {
    obj[key] = data[key];
  });
  return obj;
}

function scanActiveIndex(pathIndex, dataArr) {
  var path = '';
  var result = scanActiveIndex_loop(dataArr, path);
  return result.path;

  function scanActiveIndex_loop(dataArr, prefix) {
    var returnObj = {
      path: prefix,
      isMatched: false
    };

    for (var i = 0; i < dataArr.length; i++) {
      var tempData = formateListObj(dataArr[i]);

      if (pathIndex === tempData.index) {
        returnObj = {
          path: "".concat(tempData.index),
          isMatched: true
        };
        break;
      } else {
        var _result = scanActiveIndex_loop(tempData.children, prefix);

        if (_result.isMatched) {
          returnObj = {
            path: "".concat(tempData.index, "/./").concat(_result.path),
            isMatched: _result.isMatched
          };
          break;
        }
      }
    }

    return returnObj;
  }
}