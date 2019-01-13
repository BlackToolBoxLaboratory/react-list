"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRender = listRender;

var _react = _interopRequireDefault(require("react"));

var _storage = require("./storage.js");

var _applicationFn = require("./applicationFn.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function listRender(listThis, dataArr, order) {
  return listRenderFn();

  function listRenderFn() {
    var content = [];
    var props_layer = (0, _applicationFn.createBasicProps)('list_layer');
    var props_layer_order = (0, _applicationFn.createBasicProps)("layer-".concat(order));
    props_layer['className'] = props_layer['className'].concat(' ', props_layer_order['className']);
    props_layer['style'] = Object.assign(props_layer['style'], props_layer_order['style']);
    content.push(_react.default.createElement("ul", props_layer, dataArr.map(function (item) {
      return itemRnederFn((0, _applicationFn.formateListObj)(item));
    })));
    return content;
  }

  ;

  function itemRnederFn(itemObj) {
    var content = [];
    var props_item = (0, _applicationFn.createBasicProps)('layer_item');
    var props_item_index = (0, _applicationFn.createBasicProps)("item-".concat(itemObj.index));
    props_item['className'] = props_item['className'].concat(' ', props_item_index['className']);
    props_item['style'] = Object.assign(props_item['style'], props_item_index['style']);

    if (listThis.activeAddress.split('/./').find(function (entry) {
      return entry === itemObj.index;
    })) {
      var props_item_active = (0, _applicationFn.createBasicProps)('item-active');
      props_item['className'] = props_item['className'].concat(' ', props_item_active['className']);
      props_item['style'] = Object.assign(props_item['style'], props_item_active['style']);
    }

    var props_content = (0, _applicationFn.createBasicProps)('item_content');
    props_content['style']['padding-left'] = "".concat(_storage.storage.get('offsetWidth') * order, "px");
    var props_sublist = (0, _applicationFn.createBasicProps)('item_sublist');
    content.push(_react.default.createElement("li", props_item, _react.default.createElement("div", _extends({}, props_content, {
      onClick: function onClick(event) {
        _itemOnClickHandler(event, itemObj);
      }
    }), itemObj.content ? itemObj.content : itemObj.name), 0 < itemObj.children.length ? _react.default.createElement("div", props_sublist, listRender(listThis, itemObj.children, order + 1)) : []));
    return content;
  }

  ;

  function _itemOnClickHandler(event, itemObj) {
    _storage.storage.get('itemOnClickFn')(itemObj);

    _storage.storage.set('activeIndex', itemObj.index);

    listThis.forceUpdate();
  }
}

;