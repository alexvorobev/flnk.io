import { gql } from '@apollo/client';

export const signUpMutation = gql`
  mutation SignUpMutation(
    $name: String!,
    $surname: String!,
    $email: String!,
    $password: String!
    ) {
        signUp (
            name: $name,
            surname: $surname,
            email: $email,
            password: $password,
        ) {
            name
            surname
            email
        }
  }
`;
