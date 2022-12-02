import { gql } from '@apollo/client';

export const getLogsQuery = gql`
  query GetLogsQuery {
    getLogs {
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
