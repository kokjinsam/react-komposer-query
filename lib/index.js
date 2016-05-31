'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']);

exports.composeQueryBase = composeQueryBase;
exports.default = composeWithQuery;

var _reactKomposer = require('react-komposer');

var _gql = require('apollo-client/gql');

var _gql2 = _interopRequireDefault(_gql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeQueryBase(optionsOrFn, fn, props, onData) {
  if (!props.context) {
    var error = 'No context passed as prop';
    throw new Error(error);
  }

  var context = typeof props.context === 'function' ? props.context() : props.context;

  var Client = context.Client || context.client;

  if (!Client) {
    var _error = 'No Apollo Client found in the context';
    throw new Error(_error);
  }

  if (optionsOrFn === null || optionsOrFn === undefined) {
    var _error2 = 'Either an option object or a function should be provided';
    throw new Error(_error2);
  }

  var options = {};
  if ((typeof optionsOrFn === 'undefined' ? 'undefined' : (0, _typeof3.default)(optionsOrFn)) === 'object') {
    options = optionsOrFn;
  } else if (typeof optionsOrFn === 'function') {
    options = optionsOrFn(context);
  }

  if (!options.hasOwnProperty('query')) {
    var _error3 = 'query is missing';
    throw new Error(_error3);
  }

  if (typeof options.query !== 'string') {
    var _error4 = 'query should be string';
    throw new Error(_error4);
  }

  if (fn === null || typeof fn !== 'function') {
    var _error5 = 'No resultMapper function passed as argument';
    throw new Error(_error5);
  }

  var _options = options;
  var query = _options.query;
  var _options$forceFetch = _options.forceFetch;
  var forceFetch = _options$forceFetch === undefined ? false : _options$forceFetch;
  var others = (0, _objectWithoutProperties3.default)(_options, ['query', 'forceFetch']);


  var taggedQuery = (0, _gql2.default)(_templateObject, query);

  Client.query((0, _extends3.default)({
    query: taggedQuery,
    forceFetch: forceFetch
  }, others)).then(function (graphQLResult) {
    var mappedResult = fn(graphQLResult, props);
    onData(null, mappedResult);
  }).catch(function (ex) {
    onData(ex);
  });
}

function composeWithQuery(optionsOrFn, fn) {
  return (0, _reactKomposer.compose)(composeQueryBase.bind(null, optionsOrFn, fn));
}