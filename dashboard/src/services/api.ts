import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
