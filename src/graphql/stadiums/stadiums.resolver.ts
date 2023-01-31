import { Stadium } from '@prisma/client';
import { getStadium, getStadiums } from './stadiums.service';

export const resolvers = {
  Query: {
    stadiums: async (): Promise<Stadium[]> => {
      return getStadiums();
    },
    stadium: (_: unknown, { id }: { id: string }): Promise<Stadium> => {
      return getStadium(id);
    },
  },
};
