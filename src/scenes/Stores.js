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
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068
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

  render() {
    const { navigation } = this.props;
    const { region } = this.state;
    return (
      <MagicMove.Scene style={{ flex: 1 }}>
        <Query query={STORES_BY_DISTANCE} variables={region}>
          {
            ({ data, loading, error }) => {
              if (error) return <Text>ERROR: {error.message}</Text>;
              return (
                <>
                <StoresMap
                  region={region}
                  markers={data.stores}
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
