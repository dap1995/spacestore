import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import listStoresByDistance from "./queries/stores";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://192.168.0.106:4000/graphql'
})

export default new ApolloClient({
  cache,
  link
})

const getStores = async (variables) => client.query(listStoresByDistance(variables));
