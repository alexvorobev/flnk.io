import { gql } from '@apollo/client';

export const getLinksQuery = gql`
  query GetAllLinksQuery {
    getLinks {
      id
      hash
      path
      isActive
      isBlocked
      user {
        name
        surname
        email
      }
    }
  }
`;
