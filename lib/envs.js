"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.envsReducer = exports.initialStore = void 0;
var initialStore = {
  activeAddress: ''
};
exports.initialStore = initialStore;

var envsReducer = function envsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'set':
      Object.keys(action.data).map(function (keyIndex) {
        newState[keyIndex] = action.data[keyIndex];
      });
      return newState;

    default:
      return newState;
  }
};

exports.envsReducer = envsReducer;
var _default = envsReducer;
exports.default = _default;