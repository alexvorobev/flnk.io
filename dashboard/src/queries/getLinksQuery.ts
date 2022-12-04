import { gql } from '@apollo/client';

export const getLinksQuery = gql`
  query GetAllLinksQuery($search: String, $cursor: String) {
    getLinks(search: $search, cursor: $cursor) {
      total
      items {
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
  }
`;
