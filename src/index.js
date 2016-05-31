import { compose } from 'react-komposer';
import gql from 'apollo-client/gql';

export function composeQueryBase(optionsOrFn, fn, props, onData) {
  if (!props.context) {
    const error = 'No context passed as prop';
    throw new Error(error);
  }

  const context = typeof props.context === 'function' ? props.context() : props.context;

  const Client = context.Client || context.client;

  if (!Client) {
    const error = 'No Apollo Client found in the context';
    throw new Error(error);
  }

  if (optionsOrFn === null || optionsOrFn === undefined) {
    const error = 'Either an option object or a function should be provided';
    throw new Error(error);
  }

  let options = {};
  if (typeof optionsOrFn === 'object') {
    options = optionsOrFn;
  } else if (typeof optionsOrFn === 'function') {
    options = optionsOrFn(context);
  }

  if (!options.hasOwnProperty('query')) {
    const error = 'query is missing';
    throw new Error(error);
  }

  if (typeof options.query !== 'string') {
    const error = 'query should be string';
    throw new Error(error);
  }

  if (fn === null || typeof fn !== 'function') {
    const error = 'No resultMapper function passed as argument';
    throw new Error(error);
  }

  const {
    query,
    forceFetch = false,
    ...others,
  } = options;

  const taggedQuery = gql`${query}`;

  Client.query({
    query: taggedQuery,
    forceFetch,
    ...others,
  }).then((graphQLResult) => {
    const mappedResult = fn(graphQLResult, props);
    onData(null, mappedResult);
  }).catch((ex) => {
    onData(ex);
  });
}

export default function composeWithQuery(optionsOrFn, fn) {
  return compose(composeQueryBase.bind(null, optionsOrFn, fn));
}
