"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Index;

var _react = _interopRequireWildcard(require("react"));

var _props = require("./props.js");

var _envs = require("./envs.js");

var _application = require("./application.js");

var _listRender = require("./listRender.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Index(props) {
  var list = useList([]);
  var env = useEnv(_envs.envsReducer, _envs.initialStore);
  (0, _react.useEffect)(function () {
    _props.propsStore.init(props);

    env.dispatch({
      type: 'set',
      data: {
        'activeAddress': (0, _application.scanActiveIndex)(_props.propsStore.get('activeIndex'), _props.propsStore.get('dataArr'))
      }
    });
    list.updateValue(_props.propsStore.get('dataArr'));
  }, [props]);

  var styleObj = _props.propsStore.get('styleObj');

  var props_list = (0, _application.createBasicProps)('btb-list', styleObj, ['btb-list']);
  props_list['className'] = props_list['className'].concat(' ', 'undefined' != typeof _props.propsStore.get('className') ? _props.propsStore.get('className') : '');
  Object.assign(props_list['style'], _props.propsStore.get('style'));
  return _react.default.createElement("div", _extends({}, props, props_list, {
    ref: function ref(_ref) {
      handleRef(_ref);
    }
  }), (0, _listRender.List)({
    env: env,
    listData: list.value,
    startOrder: 0
  }));
}

function handleRef(ref) {
  _props.propsStore.get('refFn')(ref);
}

function useList(initialData) {
  var _useState = (0, _react.useState)(initialData),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return {
    value: value,
    updateValue: updateValue
  };

  function updateValue(value) {
    setValue(value);
  }
}

function useEnv(reducer, initialData) {
  var _useReducer = (0, _react.useReducer)(reducer, initialData),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      value = _useReducer2[0],
      dispatch = _useReducer2[1];

  return {
    value: value,
    dispatch: dispatch
  };
}