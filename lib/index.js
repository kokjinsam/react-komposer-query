import { compose } from 'react-komposer';
import gql from 'apollo-client/gql';

export function composeQueryBase(options, fn, props, onData) {
  const { Client } = props.context();
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

export default function composeWithQuery(query, fn) {
  return compose(composeQueryBase.bind(null, query, fn));
}
