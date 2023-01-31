import { Match, Status, Tier } from '@prisma/client';
import { getMatch, getMatches } from './matches.service';

export const resolvers = {
  Query: {
    matches: async (
      _: unknown,
      {
        season,
        tier,
        status,
        limit,
      }: { season: number; tier: Tier; status: Status; limit: number }
    ): Promise<Match[]> => {
      return getMatches({ season, tier, status, limit });
    },
    match: (_: unknown, { id }: { id: string }): Promise<Match> => {
      return getMatch(id);
    },
  },
};
