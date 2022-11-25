import { gql } from '@apollo/client';

export const meQuery = gql`
  query MeQuery {
    me {
      name
      surname
      email
      role
    }
  }
`;
