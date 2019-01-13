import { createStackNavigator, createAppContainer } from "react-navigation";
import Stores from '../scenes/Stores';
import StoreDetails from '../scenes/StoreDetails';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Stores,
  },
  StoreDetails: {
    screen: StoreDetails,
  },
});

export default createAppContainer(AppNavigator);
