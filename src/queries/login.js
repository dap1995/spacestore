import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login(
    $email: String!,
    $password: String!
  ) {
    login(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

/**
 * Returns a query to get all stores around some distance
 * @param {Object} variables
 * @param {Float} variables.email
 * @param {Float} variables.password
 */
const login = variables => ({
  mutation: LOGIN,
  variables,
});

export default login;
