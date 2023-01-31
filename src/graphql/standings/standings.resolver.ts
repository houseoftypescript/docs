import { Standing, Tier } from '@prisma/client';
import { getStanding, getStandings } from './standings.service';

export const resolvers = {
  Query: {
    standings: async (
      _: unknown,
      { season, tier }: { season: number; tier: Tier }
    ): Promise<Standing[]> => {
      return getStandings({ season, tier });
    },
    standing: (_: unknown, { id }: { id: string }): Promise<Standing> => {
      return getStanding(id);
    },
  },
};
