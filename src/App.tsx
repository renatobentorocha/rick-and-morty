import React from 'react';
import {ApolloProvider} from '@apollo/client';
import Routes from './routes/Routes';
import ApolloClientConfig from './config/ApolloClientConfig';

export default function App() {
  return (
    <ApolloProvider client={ApolloClientConfig}>
      <Routes />
    </ApolloProvider>
  );
}
