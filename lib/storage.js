"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var storage = function () {
  var store = {};

  var init = function init() {
    store = {
      dataArr: [],
      styleObj: {},
      offsetWidth: 15,
      refFn: function refFn() {},
      acticveIndex: '',
      itemOnClickFn: function itemOnClickFn() {} // featureCollapsible : {
      //   enable                      : false,
      //   itemClickWithCollapseEnable : false,
      //   defaultCollapse             : true,
      //   customCollapseButton        : '',
      //   customExtendButton          : '',
      //   itemOnCollapseFn            : function() {}
      // }

    };
  };

  var reset = function reset(inputObj) {
    if (0 == Object.keys(store).length) {
      init();
    }

    ;

    if ('object' == _typeof(inputObj)) {
      Object.keys(inputObj).map(function (key) {
        switch (key) {
          case 'styleObj':
            Object.keys(inputObj.styleObj).map(function (node_entry) {
              store.styleObj[node_entry] = {};
              Object.keys(inputObj.styleObj[node_entry]).map(function (style_key) {
                var style_key_camelCase = camelCaseTransformerFn(style_key);
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

    ;
    return get('all');
  };

  var set = function set(keyStr, value) {
    if ('string' == typeof keyStr) {
      store[keyStr] = value;
      return true;
    }

    ;
    return false;
  };

  var get = function get(keyStr) {
    var returnObj = {};

    if ('string' == typeof keyStr) {
      if ('all' == keyStr) {
        returnObj = store;
      } else {
        returnObj = store[keyStr];
      }

      ;
    }

    ;
    return returnObj;
  };

  return {
    init: init,
    reset: reset,
    set: set,
    get: get
  };
}();

exports.storage = storage;