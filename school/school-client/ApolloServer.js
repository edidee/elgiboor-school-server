import { Query, Mutation, Subscription } from "@apollo/client/react/components";
import { graphql } from "@apollo/client/react/hoc";
import { ApolloLink, HttpLink, from, split, execute } from "@apollo/client";

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'School System [web]',
    'client-version': '1.0.0',
  },
  ...
});