import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8082/graphiql?path=/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;