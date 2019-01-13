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

class StoreDetails extends React.PureComponent {
  render() {
    const { store } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={store.image}
          resizeMode={'cover'}
        />
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
            {store.title}
          </Text>
          <Text>
            {store.description}
          </Text>
        </View>
      </View>
    );
  }
}

export default StoreDetails;
