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
import { FlatList } from "react-native-gesture-handler";
import { produtos } from '../mocks';

const IMAGE_SIZE = 150;

const { width } = Dimensions.get("window");

class StoreDetails extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.store;
    return {
      title,
    };
  };

  renderProduct = ({ item }) => {
    return (
      <View style={{
        flex: 1,
        borderColor: '#ddd',
        padding: 10,
        height: 150,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          style={{
            flex: 1,
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
          source={{ uri: item.images[0] }}
        />
        <Text
          style={{
            textAlign: 'center',
            width: 120,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </View>
    );
  }

  generateProducts() {
    const produtoByRef = produtos.map(p => 
      p.colors.map(c => ({
        key: `${p.name} ${c.name}`,
        name: `${p.name} ${c.name}`,
        sizes: c.sizes,
        images: c.images,
      }),
    ));
    return [].concat(...produtoByRef);
  }

  render() {
    const { store } = this.props.navigation.state.params;
    const products = this.generateProducts(produtos);
    return (
      <MagicMove.Scene style={{ flex: 1 }}>
        <MagicMove.Image
          id={`image-${store.index}`}
          style={{
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: '#ddd',
            borderRadius: IMAGE_SIZE / 2,
            margin: 10,
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          }}
          transition={MagicMove.Transition.morph}
          source={store.image}
          resizeMode={'cover'}
          useNativeDriver={false}
        />
        <View
          style={{
            paddingBottom: 10,
            color: 'black',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              textAlignVertical: 'center',
              width: 120,
              fontWeight: 'bold',
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {store.title}
          </Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={products}
          numColumns={2}
          keyExtractor={i => `product-${i.name}`}
          renderItem={this.renderProduct}
        />
      </MagicMove.Scene>
    );
  }
}

export default StoreDetails;
