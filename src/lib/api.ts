import { GraphQLClient } from 'graphql-request';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

export const client = new GraphQLClient(API_URL, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});