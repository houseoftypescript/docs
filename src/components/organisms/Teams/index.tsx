import React from 'react';
import { Standing } from '../../../@types/vleague';
import Team from '../../molecules/Team';

export type TeamsProps = { teams: Standing[] };

const Teams: React.FC<TeamsProps> = ({ teams }) => {
  if (teams.length === 0) {
    return <div className="text-center">No Teams</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {teams.map((team: Standing) => {
        return <Team key={team.id} team={team} />;
      })}
    </div>
  );
};

export default Teams;
