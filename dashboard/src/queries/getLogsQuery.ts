import { gql } from '@apollo/client';

export const getLogsQuery = gql`
  query GetLogsQuery(
    $users: [String!]
    $actions: [String!]
    $entities: [String!]
    $dates: [String!]
    $body: String
    $cursor: String
  ) {
    getLogs(users: $users, actions: $actions, entities: $entities, dates: $dates, body: $body, cursor: $cursor) {
      total
      items {
        id
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
  }
`;
