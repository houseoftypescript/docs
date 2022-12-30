import { Competition } from '@prisma/client';
import { getCompetition, getCompetitions } from './competitions.service';

export const resolvers = {
  Query: {
    competitions: async (): Promise<Competition[]> => {
      return getCompetitions();
    },
    competition: (_: unknown, { id }: { id: string }): Promise<Competition> => {
      return getCompetition(id);
    },
  },
};
