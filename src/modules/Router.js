import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../scenes/Login';
import Stores from '../scenes/Stores';
import StoreDetails from '../scenes/StoreDetails';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Stores,
  },
  StoreDetails: {
    screen: StoreDetails,
  },
});

export default createAppContainer(AppNavigator);
