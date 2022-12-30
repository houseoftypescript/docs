import { Position } from '@prisma/client';
import { getPosition, getPositions } from './positions.service';

export const resolvers = {
  Query: {
    positions: async (): Promise<Position[]> => {
      return getPositions();
    },
    position: (_: unknown, { id }: { id: string }): Promise<Position> => {
      return getPosition(id);
    },
  },
};
