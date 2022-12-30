import { Team } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { query } from '../../apollo';
import { GET_TEAMS } from '../../apollo/graphql';
import { CURRENT_SEASON, CURRENT_TIER } from '../../constants';

export const TeamsContext = React.createContext([] as Team[]);

export const useTeams = (): Team[] => {
  const teams = React.useContext(TeamsContext);
  return teams;
};

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const getTeams = async () => {
      if (teams.length !== 0) return;
      const data: { teams: Team[] } = await query<{
        teams: Team[];
      }>(
        GET_TEAMS,
        { season: CURRENT_SEASON, tier: CURRENT_TIER },
        'GET_TEAMS'
      );
      const newTeams: Team[] = data.teams || [];
      setTeams(newTeams);
    };
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
  );
};

export default TeamsProvider;
