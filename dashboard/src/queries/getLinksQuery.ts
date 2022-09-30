import { gql } from '@apollo/client';

export const getLinksQuery = gql`
  query GetAllLinks {
    getLinks {
      id
      hash
      path
    }
  }
`;
