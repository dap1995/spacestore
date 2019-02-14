import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import _ from 'lodash';
import MapView, { AnimatedRegion } from "react-native-maps";
import * as MagicMove from 'react-native-magic-move';
import { markers } from '../mocks'

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const CARD_LEFT_RIGHT_MARGIN = 20;

export default class Stores extends React.PureComponent {
  constructor(props) {
    super(props);
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.state = {
      markers,
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  moveTo = _.debounce((index) => {
    if (this.index !== index) {
      this.index = index;
      const { coordinate } = this.state.markers[index];
      this.map.animateToCoordinate(
        {
          ...coordinate,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        },
        350,
      );
    }
  }, 20);

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => this.map.animateToCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN) + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      this.moveTo(index);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
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
      <MagicMove.Scene style={styles.container}>
        <MapView
          ref={map => this.map = map}
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation
          showsMyLocationButton
        >
          { this.state.markers.map((marker, index) => {
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            const pinColor = marker.isOnline ? 'green' : 'red';
            return (
              <MapView.Marker.Animated
                key={index}
                style={opacityStyle}
                title={marker.title}
                description={marker.description}
                coordinate={marker.coordinate}
                tracksViewChanges={false}
                pinColor={pinColor}
                onPress={() => {
                  this.map.animateToCoordinate(marker.coordinate);
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
          {this.state.markers.map((marker, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                if (this.index === index) this.props.navigation.navigate('StoreDetails', { store: { ...marker, index } });
                this.map.animateToCoordinate(marker.coordinate);
                this.list.getNode().scrollTo({ x: (index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN)) });
              }}
            >
            <Animated.View style={[styles.card, { opacity: interpolations[index].opacity }]}>
              <MagicMove.Image
                id={`image-${index}`}
                transition={MagicMove.Transition.squashAndStretch}
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
                useNativeDriver={false}
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>
      </MagicMove.Scene>
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
