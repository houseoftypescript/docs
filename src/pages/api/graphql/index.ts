import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { ApolloServer, gql } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolvers as competitionsResolver } from '../../../graphql/competitions/competitions.resolver';
import competitionsTypeDefs from '../../../graphql/competitions/schema.graphql';
import { resolvers as matchesResolver } from '../../../graphql/matches/matches.resolver';
import matchesTypeDefs from '../../../graphql/matches/schema.graphql';
import { resolvers as playersResolver } from '../../../graphql/players/players.resolver';
import playersTypeDefs from '../../../graphql/players/schema.graphql';
import { resolvers as positionsResolver } from '../../../graphql/positions/positions.resolver';
import positionsTypeDefs from '../../../graphql/positions/schema.graphql';
import stadiumsTypeDefs from '../../../graphql/stadiums/schema.graphql';
import { resolvers as stadiumsResolver } from '../../../graphql/stadiums/stadiums.resolver';
import standingsTypeDefs from '../../../graphql/standings/schema.graphql';
import { resolvers as standingsResolver } from '../../../graphql/standings/standings.resolver';
import teamsTypeDefs from '../../../graphql/teams/schema.graphql';
import { resolvers as teamsResolver } from '../../../graphql/teams/teams.resolver';
import videosTypeDefs from '../../../graphql/videos/schema.graphql';
import { resolvers as videosResolver } from '../../../graphql/videos/videos.resolver';

const rootTypeDefs = gql`
  type Query
`;

const apolloServer = new ApolloServer({
  typeDefs: mergeTypeDefs([
    rootTypeDefs,
    competitionsTypeDefs,
    matchesTypeDefs,
    playersTypeDefs,
    positionsTypeDefs,
    stadiumsTypeDefs,
    standingsTypeDefs,
    teamsTypeDefs,
    videosTypeDefs,
  ]),
  resolvers: mergeResolvers([
    competitionsResolver,
    matchesResolver,
    playersResolver,
    positionsResolver,
    stadiumsResolver,
    standingsResolver,
    teamsResolver,
    videosResolver,
  ]),
});

const startServer = apolloServer.start();

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  // corsMiddleware(request, response, cors);
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(request, response);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors =
  (func: Function) =>
  async (request: NextApiRequest, response: NextApiResponse) => {
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    );
    response.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (request.method === 'OPTIONS') {
      response.status(200).end();
      return;
    }
    return await func(request, response);
  };

export default cors(handler);
