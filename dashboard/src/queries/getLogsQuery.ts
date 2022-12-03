import { gql } from '@apollo/client';

export const getLogsQuery = gql`
  query GetLogsQuery($users: [String!], $actions: [String!], $entities: [String!], $dates: [String!], $body: String) {
    getLogs(users: $users, actions: $actions, entities: $entities, dates: $dates, body: $body) {
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
