"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBasicProps = createBasicProps;
exports.formateListObj = formateListObj;
exports.scanActiveIndex = scanActiveIndex;

var _storage = require("./storage.js");

function createBasicProps(className) {
  var styleObj = _storage.storage.get('styleObj');

  var obj = {
    key: className,
    className: className,
    style: styleObj[className] ? Object.assign({}, styleObj[className]) : {}
  };
  return obj;
}

;

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

;

function scanActiveIndex(dataArr) {
  var path = '';
  var result = scanActiveIndex_loop(dataArr, path);
  return result.path;
}

;

function scanActiveIndex_loop(dataArr, prefix) {
  var returnObj = {
    path: prefix,
    isMatched: false
  };

  for (var i = 0; i < dataArr.length; i++) {
    var tempData = formateListObj(dataArr[i]);

    if (_storage.storage.get('activeIndex') === tempData.index) {
      returnObj = {
        path: "".concat(tempData.index),
        isMatched: true
      };
      break;
    } else {
      var result = scanActiveIndex_loop(tempData.children, prefix);

      if (result.isMatched) {
        returnObj = {
          path: "".concat(tempData.index, "/./").concat(result.path),
          isMatched: result.isMatched
        };
        break;
      }

      ;
    }

    ;
  }

  ;
  return returnObj;
}