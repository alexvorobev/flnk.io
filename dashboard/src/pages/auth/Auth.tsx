import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { toaster } from 'evergreen-ui';

import { AuthForm, AuthFormFields } from 'components/forms';
import { AuthLayout } from 'components/layouts';
import { authQuery } from 'queries/authQuery';
import { useAuth } from 'controllers/auth/useAuth';

interface ResponseData {
  auth: {
    token: string;
  };
}

const Auth = () => {
  const [getToken, { loading }] = useLazyQuery(authQuery);
  const { handleLogin } = useAuth();

  const onSubmit = useCallback(
    (data: AuthFormFields) => {
      getToken({
        variables: {
          ...data,
        },
        onCompleted: (response: ResponseData) => {
          if (response.auth.token) {
            handleLogin(response.auth.token);
          }
        },
        onError: (error) => {
          toaster.danger('Error!', {
            description: `${error.message}. Please try again`,
          });
        },
      });
    },
    [getToken, handleLogin],
  );

  return (
    <AuthLayout>
      <h3 style={{ textAlign: 'center' }}>Auth</h3>
      <AuthForm isLoading={loading} onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Auth;
