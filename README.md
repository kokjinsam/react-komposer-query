## Apollo Query for React Komposer

> For more information on React Komposer, see [here](https://github.com/kadirahq/react-komposer).

### Installation

```
npm install --save react-komposer-query react-komposer apollo-client
```

> react-komposer and apollo-client are peerDependencies of react-komposer-query

### Usage

In `configs/context.js`:

```
import * as Collections from '../../lib/collections';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { Tracker } from 'meteor/tracker';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default function () {
  const url = Meteor.absoluteUrl('graphql');
  const networkInterface = createNetworkInterface(url);
  const Client = new ApolloClient({
    networkInterface,
  });

  return {
    Meteor,
    FlowRouter,
    Collections,
    Tracker,
    Client, // make sure to supply this
  };
}
```

Here's an example of a Mantra container:

```
import TodoList from '../../components/todo-list';
import composeWithQuery from 'react-komposer-query';
import { useDeps, composeAll } from 'mantra-core';

const options = {
  query: `
    query todos {
      allTodos {
        _id
        todo
        createdAt
      }
    }
  `,
};

const dataMapper = ({
  data,
  errors,
}) => {
  const {
    todos,
  } = data;

  return {
    todos,
    errors,
  };
};


export default composeAll(
  composeWithQuery(options, dataMapper),
  useDeps()
)(TodoList);

```
