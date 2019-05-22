import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import _ from 'lodash';
import MapView, { AnimatedRegion } from "react-native-maps";
import * as MagicMove from 'react-native-magic-move';
import { imageNotFound } from '../styles/theme';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const CARD_LEFT_RIGHT_MARGIN = 20;

export default class StoresMap extends React.PureComponent {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    isReady: false,
  }

  index = 0;
  animation = new Animated.Value(0);
  map;

  moveTo = _.debounce((index) => {
    if (this.index !== index) {
      this.index = index;
      const { coordinate } = this.props.markers[index];
      this.map.animateCamera(
        {
          center: coordinate,
        },
        350,
      );
    }
  }, 20);

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN) + 0.3); // animate 30% away from landing on the next item
      if (index >= this.props.markers.length) {
        index = this.props.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      this.moveTo(index);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { region } = this.props;
    const { isReady } = this.state;
    if (
      isReady && (
        prevProps.region.latitude !== region.latitude
        || prevProps.region.longitude !== region.longitude
      )
    ) {
      this.map.animateToRegion(region);
    }
  }

  render() {
    const {
      markers = [],
      region,
    } = this.props;
    const interpolations = markers.map((_, index) => {
      const inputRange = [
        (index - 1) * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN),
        index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN),
        (index + 1) * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return (
      <>
        <MapView
          ref={map => this.map = map}
          style={styles.container}
          initialRegion={region}
          onMapReady={() => this.setState({ isReady: true })}
          showsUserLocation
          showsMyLocationButton
        >
          { markers.map((marker, index) => {
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            const pinColor = marker.isOnline ? 'green' : 'red';
            const {
              coordinate,
              name,
              email: description,
            } = marker;
            return (
              <MapView.Marker.Animated
                key={index}
                style={opacityStyle}
                title={name}
                description={description}
                coordinate={coordinate}
                tracksViewChanges={false}
                pinColor={pinColor}
                onPress={() => {
                  this.map.animateCamera({ center: coordinate }, 350);
                  this.list.getNode().scrollTo({ x: (index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN)) });
                }}
              />
            );
          })}
        </MapView>
        <Animated.ScrollView
          ref={ref => this.list = ref}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          { markers.map((marker, index) => {
            const { coordinate, images, email } = marker;
            return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                if (this.index === index) this.props.navigation.navigate('StoreDetails', { store: { ...marker, index } });
                this.map.animateCamera({ center: coordinate }, 350);
                this.list.getNode().scrollTo({ x: (index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN)) });
              }}
            >
            <Animated.View style={[styles.card, { opacity: interpolations[index].opacity }]}>
              <MagicMove.Image
                id={`image-${index}`}
                transition={MagicMove.Transition.move}
                source={{ uri: images.length > 0 ? images[0].url : imageNotFound }}
                style={styles.cardImage}
                resizeMode="cover"
                useNativeDriver={false}
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {email}
                </Text>
              </View>
            </Animated.View>
            </TouchableWithoutFeedback>
          )})}
        </Animated.ScrollView>
      </>
    );
  }
}

const mapStyle = Platform.select({
  ios: {
    flex: 1
  },
  android: {
    width,
    height,
  }
});

const styles = StyleSheet.create({
  container: {
    ...mapStyle,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: CARD_LEFT_RIGHT_MARGIN / 2,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
