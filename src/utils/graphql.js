import React from 'react';
import { ApolloConsumer } from 'react-apollo';

export function withClient(Component) {
  return function ClientComponent(props) {
    return (
      <ApolloConsumer>
        { client => <Component client={client} {...props} /> }
      </ApolloConsumer>
    );
  };
}
