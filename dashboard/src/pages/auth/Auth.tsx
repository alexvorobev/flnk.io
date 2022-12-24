import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

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
  const { handleLogin, handleLogout } = useAuth();

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
        onError: () => {
          handleLogout();
        },
      });
    },
    [getToken, handleLogin, handleLogout],
  );

  return (
    <AuthLayout>
      <h3 style={{ textAlign: 'center' }}>Auth</h3>
      <AuthForm isLoading={loading} onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Auth;
