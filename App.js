
import React from 'react';
import "react-navigation-magic-move";
import * as MagicMove from 'react-native-magic-move';
import { Root } from "native-base";
import { ApolloProvider } from 'react-apollo';
import AppContainer from './src/modules/Router';
import client from './src/index';

export default App = () => (
  <MagicMove.Provider>
    <ApolloProvider client={client}>
      <Root>
        <AppContainer />
      </Root>
    </ApolloProvider>
  </MagicMove.Provider>
);
