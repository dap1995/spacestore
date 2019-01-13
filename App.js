
import "react-navigation-magic-move";
import React from 'react';
import * as MagicMove from 'react-native-magic-move';
import AppContainer from './modules/Router';

export default App = () => (
  <MagicMove.Provider>
    <AppContainer />
  </MagicMove.Provider>
);
