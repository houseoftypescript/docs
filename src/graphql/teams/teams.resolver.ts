import { Status, Team, Tier } from '@prisma/client';
import { getTeam, getTeams } from './teams.service';
import { getMatches } from '../matches/matches.service';
import { getPlayers } from '../players/players.service';
import { getStandings } from '../standings/standings.service';

export const resolvers = {
  Query: {
    teams: async (
      _: unknown,
      { season, tier }: { season: number; tier: Tier }
    ): Promise<Team[]> => {
      return getTeams({ season, tier });
    },
    team: (_: unknown, { id }: { id: string }): Promise<Team> => {
      return getTeam(id);
    },
  },
  Team: {
    matches: async (team: Team) => {
      return getMatches({ teamId: team.id });
    },
    players: async (team: Team) => {
      return getPlayers({ teamId: team.id });
    },
    results: (team: Team) => {
      return getMatches({ teamId: team.id, status: Status.FINISHED });
    },
    standings: (team: Team) => {
      return getStandings({ teamId: team.id, status: Status.FINISHED });
    },
  },
};
