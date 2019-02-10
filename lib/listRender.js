"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = List;

var _react = _interopRequireDefault(require("react"));

var _props = require("./props.js");

var _application = require("./application.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function List(_ref) {
  var listData = _ref.listData,
      startOrder = _ref.startOrder,
      env = _ref.env;

  var styleObj = _props.propsStore.get('styleObj');

  return renderList(listData, startOrder);

  function renderList(dataArr, order) {
    var props_layer = (0, _application.createBasicProps)("layer-".concat(order), styleObj, ['list_layer', "layer-".concat(order)]);
    return _react.default.createElement("ul", props_layer, dataArr.map(function (item) {
      return itemRnederFn((0, _application.formateListObj)(item), order);
    }));
  }

  function itemRnederFn(itemObj, order) {
    var content = [];
    var isActive = false;
    env.value['activeAddress'].split('/./').find(function (entry) {
      isActive = entry === itemObj.index;
      return isActive;
    });
    var props_item = (0, _application.createBasicProps)("item-".concat(itemObj.index), styleObj, ['layer_item', "item-".concat(itemObj.index), isActive ? 'item-active' : '']);
    var props_content = (0, _application.createBasicProps)('item_content', styleObj, ['item_content']);
    var props_sublist = (0, _application.createBasicProps)('item_sublist', styleObj, ['item_sublist']);
    content.push(_react.default.createElement("li", props_item, _react.default.createElement("div", _extends({}, props_content, {
      onClick: function onClick(event) {
        _itemOnClickHandler(event, itemObj);
      }
    }), itemObj.content ? itemObj.content : itemObj.name), 0 < itemObj.children.length ? _react.default.createElement("div", props_sublist, renderList(itemObj.children, order + 1)) : []));
    return content;
  }

  function _itemOnClickHandler(event, itemObj) {
    _props.propsStore.get('itemOnClickFn')(itemObj);

    env.dispatch({
      type: 'set',
      data: {
        'activeAddress': (0, _application.scanActiveIndex)(itemObj.index, _props.propsStore.get('dataArr'))
      }
    });
  }
}