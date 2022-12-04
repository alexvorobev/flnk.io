import { gql } from '@apollo/client';

export const getLinksQuery = gql`
  query GetAllLinksQuery($search: String) {
    getLinks(
      search: $search
    ) {
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
