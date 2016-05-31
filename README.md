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
import { configureGraphQLClient } from 'apollo-tools';

export default function () {
  const Client = configureGraphQLClient({
    url: '/graphql',
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

`composeWithQuery` takes two arguments, namely, optionsOrFn and resultMapper. Here's an example of a Mantra container:

```
import TodoList from '../../components/todo-list';
import composeWithQuery from 'react-komposer-query';
import { useDeps, composeAll } from 'mantra-core';

// either provide an options object like below:
const options = {
  query: `
    query todos($type: TodoType) {
      allTodos(type: $type) {
        _id
        todo
        createdAt
      }
    }
  `,
  variables: {
    type: 'ACTIVE'
  }
};

// or an options function that return an options object:
const options = (context) {
  console.log(context);
  return {
    query: `
      query todos($type: TodoType) {
        allTodos(type: $type) {
          _id
          todo
          createdAt
        }
      }
    `,
    variables: {
      type: 'ACTIVE'
    }
  };
};

const resultMapper = ({
  data,
  errors,
}) => {
  const {
    allTodos,
  } = data;

  return {
    todos: allTodos,
    errors,
  };
};


export default composeAll(
  composeWithQuery(options, resultMapper),
  useDeps()
)(TodoList);

```
