import { gql } from '@apollo/client';

export const updateLinkMutation = gql`
  mutation UpdateLinkMutation($id: Float!, $hash: String!, $path: String!) {
    updateLink(id: $id, hash: $hash, path: $path) {
      id
      hash
      path
    }
  }
`;
