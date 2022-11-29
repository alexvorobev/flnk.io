import { gql } from '@apollo/client';

export const getUsersQuery = gql`
  query GetUsersListQuery {
    getUsers {
      id
      name
      surname
      email
      role
      isBlocked
    }
  }
`;
