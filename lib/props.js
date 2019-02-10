"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsStore = void 0;

var _application = require("./application.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var propsStore = function () {
  var store = {
    dataArr: [],
    styleObj: {},
    refFn: function refFn() {},
    activeIndex: '',
    itemOnClickFn: function itemOnClickFn() {} // featureCollapsible : {
    //   enable                      : false,
    //   itemClickWithCollapseEnable : false,
    //   defaultCollapse             : true,
    //   customCollapseButton        : '',
    //   customExtendButton          : '',
    //   itemOnCollapseFn            : function() {}
    // }

  };

  var init = function init(inputObj) {
    if ('object' == _typeof(inputObj)) {
      Object.keys(inputObj).map(function (key) {
        switch (key) {
          case 'styleObj':
            Object.keys(inputObj.styleObj).map(function (node_entry) {
              store.styleObj[node_entry] = {};
              Object.keys(inputObj.styleObj[node_entry]).map(function (style_key) {
                var style_key_camelCase = (0, _application.camelCaseTransformerFn)(style_key);
                store.styleObj[node_entry][style_key_camelCase] = inputObj.styleObj[node_entry][style_key];
              });
            });
            break;

          default:
            store[key] = inputObj[key];
            break;
        }
      });
    }

    return get('all');
  };

  var get = function get(keyStr) {
    var returnObj = {};

    if ('string' == typeof keyStr) {
      if ('all' == keyStr) {
        returnObj = store;
      } else {
        returnObj = store[keyStr];
      }
    }

    return returnObj;
  };

  return {
    init: init,
    get: get
  };
}();

exports.propsStore = propsStore;