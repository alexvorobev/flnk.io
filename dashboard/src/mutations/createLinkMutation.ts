import { gql } from '@apollo/client';

export const createLinkMutation = gql`
  mutation CreateLinkMutation($hash: String!, $path: String!) {
    createLink(hash: $hash, path: $path) {
      id
      hash
      path
    }
  }
`;
