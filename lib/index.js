import { compose } from 'mantra-core';
import gql from 'apollo-client/gql';

export function composeQueriesBase(query, fn, props, onData) {
  const { Client } = props.context();

  const _query = gql`
    {
      ${query}
    }
  `;

  Client.query({
    query: _query,
  }).then((graphQLResult) => {
    const mappedResult = fn(graphQLResult, props);
    onData(null, mappedResult);

    /*
    const { errors, data } = graphQLResult;

    if (data) {
      console.log('got data');
      onData(null, data);
    }

    if (errors) {
      console.log('got some GraphQL execution errors', errors);
      onData(null, errors);
    }
    */
  }).catch((ex) => {
    console.log('there was an error sending query', ex);
    onData(ex);
  });
}

export default function composeWithQueries(query, fn) {
  return compose(composeQueriesBase.bind(null, query, fn));
}
