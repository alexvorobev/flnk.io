import { gql } from '@apollo/client';

export const authQuery = gql`
  query AuthQuery($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      token
    }
  }
`;
