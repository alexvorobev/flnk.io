import { gql } from '@apollo/client';

export const deleteLinkMutation = gql`
  mutation DeleteLinkMutation($id: Float!) {
    deleteLink(id: $id) {
      id
      hash
      path
    }
  }
`;
