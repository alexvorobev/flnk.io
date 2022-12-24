import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { toaster } from 'evergreen-ui';

import { SignUpForm, SignUpFormFields } from 'components/forms';
import { AuthLayout } from 'components/layouts';
import { signUpMutation } from 'mutations/signUpMutations';
import { useAuth } from 'controllers/auth/useAuth';
import { Mutation } from 'schema/types';

const SignUp = () => {
  const [signUp, { loading }] = useMutation<Mutation>(signUpMutation);
  const { handleLogin } = useAuth();

  const handleSignUp = useCallback(
    (formData: SignUpFormFields) => {
      signUp({
        variables: {
          ...formData,
        },
      }).then(({ data }) => {
        const { signUp: signUpData } = data ?? {};

        if(signUpData?.token) {
          toaster.success('Success!', {
            description: 'You have been successfully signed up!',
          });

          handleLogin(signUpData.token);
        }
      }).catch((error) => {
        toaster.danger('Failed!', {
          description: `Failed: ${error.message}`,
        });
      });
    },
    [handleLogin, signUp],
  );

  return (
    <AuthLayout>
      <h3 style={{ textAlign: 'center' }}>Sign up</h3>
      <SignUpForm isLoading={loading} onSubmit={handleSignUp} />
    </AuthLayout>
  );
};

export default SignUp;
