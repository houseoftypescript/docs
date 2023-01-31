import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  InMemoryCache,
} from '@apollo/client';
import { API } from '../environments';

const URI: string = process.env.URI || `${API}/graphql`;
console.info('URI', URI);

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export const query = async <T>(
  query: DocumentNode,
  variables: Record<string, any> = {},
  name = 'APOLLO_QUERY'
): Promise<T> => {
  try {
    const result: ApolloQueryResult<T> = await client.query<T>({
      query,
      variables,
    });
    const data: T = result.data;
    return data;
  } catch (error) {
    console.error(`Apollo query ${name} error`, error);
    return {} as T;
  }
};

export default client;
