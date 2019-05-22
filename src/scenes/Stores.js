import React from "react";
import {
  StyleSheet,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import _ from 'lodash';
import MapView, { AnimatedRegion } from "react-native-maps";
import * as MagicMove from 'react-native-magic-move';
import { Query } from "react-apollo";
import { STORES_BY_DISTANCE } from '../queries/stores';
import StoresMap from "./StoresMap";

const Loading = ({ isEnabled }) => {
  if (!isEnabled) return null;
  return (<Text>Loading</Text>);
}

export default class Stores extends React.PureComponent {
  constructor(props) {
    super(props);
    this.index = 0;
    this.state = {
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      },
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const DISTANCE_FROM_GROUND = 1000; // meters
        const delta = this.calcDelta(latitude, DISTANCE_FROM_GROUND);
        this.setState({
          region: {
            latitude,
            longitude,
            ...delta,
          },
        });
      },
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  calcDelta(latitude, accuracy){
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
    return {
      latitudeDelta,
      longitudeDelta,
      accuracy,
    };
  }

  render() {
    const { navigation } = this.props;
    const { region } = this.state;
    return (
      <MagicMove.Scene style={{ flex: 1 }}>
        <Query query={STORES_BY_DISTANCE} variables={region}>
          {
            ({ data, loading, error }) => {
              if (error) return <Text>ERROR: {error.message}</Text>;
              const { storesByDistance = [] } = data;
              return (
                <>
                  <StoresMap
                    region={region}
                    markers={storesByDistance}
                    navigation={navigation}
                  />
                  <Loading isEnabled={loading} />
                </>
              );
            }
          }
        </Query>
      </MagicMove.Scene>
    );
  }
}
