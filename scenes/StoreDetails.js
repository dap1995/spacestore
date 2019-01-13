import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Animated,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import * as MagicMove from 'react-native-magic-move';

const { width } = Dimensions.get("window");

class StoreDetails extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.store;
    return {
      title,
    };
  };

  render() {
    const { store } = this.props.navigation.state.params;
    return (
      <MagicMove.Scene style={{ flex: 1 }}>
        <MagicMove.Image
          id={`image-${store.index}`}
          style={{
            width,
            height: 200,
          }}
          transition={MagicMove.Transition.morph}
          source={store.image}
          resizeMode={'stretch'}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
            {store.title}
          </Text>
          <Text>
            {store.description}
          </Text>
        </View>
      </MagicMove.Scene>
    );
  }
}

export default StoreDetails;
