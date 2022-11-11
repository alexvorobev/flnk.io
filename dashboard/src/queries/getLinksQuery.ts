import { gql } from '@apollo/client';

export const getLinksQuery = gql`
  query GetAllLinksQuery {
    getLinks {
      id
      hash
      path
    }
  }
`;
