import { gql } from '@apollo/client';

export const getUsersQuery = gql`
  query GetUsersListQuery {
    getUsers {
      total
      items {
        id
        name
        surname
        email
        role
        isBlocked
      }
    }
  }
`;
