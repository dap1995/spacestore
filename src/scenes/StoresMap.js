import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import _ from 'lodash';
import MapView, { AnimatedRegion } from "react-native-maps";
import * as MagicMove from 'react-native-magic-move';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const CARD_LEFT_RIGHT_MARGIN = 20;

export default class StoresMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  map;

  static navigationOptions = {
    title: 'Home',
  };

  moveTo = _.debounce((index) => {
    if (this.index !== index) {
      this.index = index;
      const { address } = this.props.markers[index];
      this.map.animateToCoordinate(
        {
          ...address,
          latitudeDelta: this.props.region.latitudeDelta,
          longitudeDelta: this.props.region.longitudeDelta,
        },
        350,
      );
    }
  }, 20);

  componentDidMount() {
    const { region } = this.props;
    this.map.animateToCoordinate({
      ...region,
    });
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

  render() {
    const {
      markers = [],
      region,
    } = this.props;
    const interpolations = markers.map((marker, index) => {
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
          showsUserLocation
          showsMyLocationButton
        >
          { markers.map((marker, index) => {
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            const pinColor = marker.isOnline ? 'green' : 'red';
            const { address } = marker;
            return (
              <MapView.Marker.Animated
                key={index}
                style={opacityStyle}
                title={marker.name}
                description={marker.description}
                coordinate={address}
                tracksViewChanges={false}
                pinColor={pinColor}
                onPress={() => {
                  this.map.animateToCoordinate(marker.address);
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
          {markers.map((marker, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                if (this.index === index) this.props.navigation.navigate('StoreDetails', { store: { ...marker, index } });
                this.map.animateToCoordinate(marker.address);
                this.list.getNode().scrollTo({ x: (index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN)) });
              }}
            >
            <Animated.View style={[styles.card, { opacity: interpolations[index].opacity }]}>
              <MagicMove.Image
                id={`image-${index}`}
                transition={MagicMove.Transition.squashAndStretch}
                source={{ uri: marker.logo }}
                style={styles.cardImage}
                resizeMode="cover"
                useNativeDriver={false}
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
