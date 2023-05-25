import {ApolloClient, InMemoryCache} from '@apollo/client';

const cache = new InMemoryCache();

const uri = 'https://rickandmortyapi.com/graphql';

export default new ApolloClient({
  uri,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});
