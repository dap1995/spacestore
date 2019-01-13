import React, { Component } from "react";
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
import _ from 'lodash';
import MapView from "react-native-maps";

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
const CARD_LEFT_RIGHT_MARGIN = 20;

export default class screens extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.animation = new Animated.Value(0);
    this.state = {
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Loja Daniel",
          description: "Encontre aqui diversos produtos de vestuario",
          image: Images[0],
          isOnline: false,
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: "Loja do Junior",
          description: "Venha conhecer nossas lindas peças hitech",
          image: Images[1],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: "Loja do Luciano",
          description: "Encontre aqui lindas peças de roupas das mais variadas cores",
          image: Images[2],
          isOnline: false,
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Loja da Karla",
          description: "Vista-se bem, Sinta-se bem",
          image: Images[3],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.521026,
            longitude: -122.6561117,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.821016,
            longitude: -122.1561917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.521216,
            longitude: -122.6591917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.525016,
            longitude: -122.6661917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.521116,
            longitude: -122.6569917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.221016,
            longitude: -123.6561917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 44.521016,
            longitude: -122.9561917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.525016,
            longitude: -122.6261917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
        {
          coordinate: {
            latitude: 45.524016,
            longitude: -122.6560917,
          },
          title: "Loja de Teste",
          description: "Teste",
          image: Images[Math.floor(Math.random() * 4)],
          isOnline: true,
        },
      ],
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
  }

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
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
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
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
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
                if (this.index === index) Alert.alert('Abriu loja');
                this.map.animateToCoordinate(marker.coordinate);
                this.list.getNode().scrollTo({ x: (index * (CARD_WIDTH + CARD_LEFT_RIGHT_MARGIN)) });
              }}
            >
            <Animated.View style={[styles.card, { opacity: interpolations[index].opacity }]}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
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
      </View>
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
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
