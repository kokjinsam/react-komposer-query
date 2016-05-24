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

function composeQueryBase(options, fn, props, onData) {
  if (options === null || (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
    var error = 'No options object passed as argument';
    throw new Error(error);
  }

  if (!options.hasOwnProperty('query')) {
    var _error = 'query is missing';
    throw new Error(_error);
  }

  if (typeof options.query !== 'string') {
    var _error2 = 'query should be string';
    throw new Error(_error2);
  }

  if (fn === null || typeof fn !== 'function') {
    var _error3 = 'No resultMapper function passed as argument';
    throw new Error(_error3);
  }

  if (!props.context) {
    var _error4 = 'No context passed as prop';
    throw new Error(_error4);
  }

  var context = typeof props.context === 'function' ? props.context() : props.context;

  var Client = context.Client || context.client;

  if (!Client) {
    var _error5 = 'No Apollo Client found in the context';
    throw new Error(_error5);
  }

  var query = options.query;
  var _options$forceFetch = options.forceFetch;
  var forceFetch = _options$forceFetch === undefined ? false : _options$forceFetch;
  var others = (0, _objectWithoutProperties3.default)(options, ['query', 'forceFetch']);


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

function composeWithQuery(query, fn) {
  return (0, _reactKomposer.compose)(composeQueryBase.bind(null, query, fn));
}