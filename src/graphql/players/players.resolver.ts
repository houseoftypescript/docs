import { Player } from '@prisma/client';
import { getPlayer, getPlayers } from './players.service';

export const resolvers = {
  Query: {
    players: async (): Promise<Player[]> => {
      return getPlayers();
    },
    player: (_: unknown, { id }: { id: string }): Promise<Player> => {
      return getPlayer(id);
    },
  },
};
