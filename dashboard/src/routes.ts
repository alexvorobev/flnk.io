export const PROTECTED_ROUTES = {
  HOME: '/',
  USERS: '/users',
  LOGS: '/logs',
};

export const PUBLIC_ROUTES = {
  SIGN_UP: '/sign-up',
  AUTH: '/auth',
};

export const ROUTES = {
  ...PROTECTED_ROUTES,
  ...PUBLIC_ROUTES,
};
