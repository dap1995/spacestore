/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import haversine from 'haversine';


const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

export default class App extends Component {
  state = {
    latitude: 37.78825,
    longitude: -122.4324,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      }),
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  onRegionChange = (region) => this.setState({ region });

  render() {
    console.log(this.getMapRegion());
    return (
      <View style={styles.container}>
       <MapView
         style={styles.map}
         region={this.getMapRegion()}
         showsUserLocation={true}
         showsMyLocationButton={true}
         onUserLocationChange={(data) => console.log(data)}
       >
       <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
       <Marker
        coordinate={{
          latitude: -26.489935553974444,
          longitude: -49.07683754777472,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        title="Loja do Daniel"
        description="Linda loja de penhores perto da systextil"
      />
      <Marker
        coordinate={{
          latitude: -26.479935553974444,
          longitude: -49.07683754777472,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        title="Loja do Pedro"
        description="Linda loja de artefatos"
      />
      <Marker
        coordinate={{
          latitude: -26.489935553974444,
          longitude: -49.08783754777472,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        title="Loja do Junior"
        description="Loja de antiguidades"
      />
      <Marker
        coordinate={{
          latitude: -26.499935553974444,
          longitude: -49.07683754777472,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        title="Loja do Luciano"
        description="Loja de produtos"
      />
       </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
