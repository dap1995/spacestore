import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getData } from './utils/storage';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'https://87eb6df0.ngrok.io/graphql',
  // uri: 'https://api-spacestore.herokuapp.com/graphql',
  // uri: 'http://192.168.0.106:4000/graphql'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getData('auth');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
});
const link = authLink.concat(httpLink);

export default new ApolloClient({
  cache,
  link,
});
