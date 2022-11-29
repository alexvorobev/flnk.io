import { gql } from '@apollo/client';

export const updateLinkMutation = gql`
  mutation UpdateLinkMutation($updateLinkInput: UpdateLinkInput!) {
    updateLink(updateLinkInput: $updateLinkInput) {
      id
      hash
      path
      isActive
      isBlocked
    }
  }
`;
