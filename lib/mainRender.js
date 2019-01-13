"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainRender = mainRender;

var _react = _interopRequireDefault(require("react"));

var _storage = require("./storage.js");

var _applicationFn = require("./applicationFn.js");

var _listRender = require("./listRender.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function mainRender(listThis) {
  return mainRenderFn();

  function mainRenderFn() {
    var content = [];
    var props_list = (0, _applicationFn.createBasicProps)('btb-list');
    props_list['className'] = props_list['className'].concat(' ', _storage.storage.get('className') ? _storage.storage.get('className') : '');
    props_list['style'] = Object.assign(props_list['style'], _storage.storage.get('style') ? _storage.storage.get('style') : {});
    content.push(_react.default.createElement("div", _extends({}, props_list, {
      ref: function ref(_ref) {
        _refHandler(_ref);
      }
    }), (0, _listRender.listRender)(listThis, _storage.storage.get('dataArr'), 0)));
    return content;
  }

  function _refHandler(ref) {
    _storage.storage.get('refFn')(ref);
  }

  ;
}

;