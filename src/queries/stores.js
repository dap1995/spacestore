import gql from 'graphql-tag';

export const STORES_BY_DISTANCE = gql`
  query storesByDistance(
    $latitude: Float!,
    $longitude: Float!,
    $distance: Float
  ) {
    storesByDistance(
      latitude: $latitude,
      longitude: $longitude,
      distance: $distance
    ) {
      id
      name
      document
      email
      address {
        id
        uf
        city
        neighborhood
        street
        number
        complement
      }
      coordinate {
        latitude
        longitude
      }
      owner {
        name
        email
      }
      images {
        url
        sequence
      }
    }
  }
`;

/**
 * Returns a query to get all stores around some distance
 * @param {Object} variables
 * @param {Float} variables.latitude
 * @param {Float} variables.longitude
 * @param {Float} variables.distance
 */
const listStoresByDistance = (variables) => ({
  query: STORES_BY_DISTANCE,
  variables,
});

export default listStoresByDistance;
