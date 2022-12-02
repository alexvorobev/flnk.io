import { gql } from '@apollo/client';

export const getLogsQuery = gql`
  query GetLogsQuery(
    $users: [String!]
    $actions: [String!]
    $entities: [String!]
  ) {
    getLogs(
      users: $users
      actions: $actions
      entities: $entities
    ) {
      author {
        name
        surname
        email
      }
      action
      entity
      entityData
      createdAt
    }
  }
`;
