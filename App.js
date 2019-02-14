
import "react-navigation-magic-move";
import React from 'react';
import * as MagicMove from 'react-native-magic-move';
import { Root } from "native-base";
import AppContainer from './modules/Router';

export default App = () => (
  <MagicMove.Provider>
    <Root>
      <AppContainer />
    </Root>
  </MagicMove.Provider>
);
