import { gql } from '@apollo/client';

export const updateUserMutation = gql`
  mutation UpdateUserMutation($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      surname
      email
      role
      isBlocked
    }
  }
`;
