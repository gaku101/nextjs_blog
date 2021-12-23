import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'nextjsblog',
  apiKey: process.env.API_KEY,
});