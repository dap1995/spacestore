import gql from 'graphql-tag';

export const STORES_BY_DISTANCE = gql`
  query storesByDistance(
    $latitude: Float!,
    $longitude: Float!,
    $distance: Float
  ) {
    stores(
      latitude: $latitude,
      longitude: $longitude,
      distance: $distance
    ) {
      id
      name
      description
      logo
      email
      address {
        id
        uf
        city
        neighborhood
        street
        number
        complement
        latitude
        longitude
      }
      owner {
        name
        email
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
