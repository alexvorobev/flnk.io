import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { SignUpForm, SignUpFormFields } from 'components/forms';
import { AuthLayout } from 'components/layouts';
import { signUpMutation } from 'mutations/signUpMutations';

const SignUp = () => {
  const [signUp] = useMutation(signUpMutation);

  const handleSignUp = useCallback(
    (data: SignUpFormFields) => {
      signUp({
        variables: {
          ...data,
        },
      });
    },
    [signUp],
  );

  return (
    <AuthLayout>
      <h1>Register</h1>
      <SignUpForm onSubmit={handleSignUp} />
    </AuthLayout>
  );
};

export default SignUp;
