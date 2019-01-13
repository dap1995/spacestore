import { createStackNavigator, createAppContainer } from "react-navigation";
import Stores from '../scenes/Stores';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Stores,
  }
});

export default createAppContainer(AppNavigator);
