import { Match as MatchType } from '@prisma/client';
import Link from 'next/link';
import Logo from '../../atoms/Logo';

export type MatchStatusProps = { match: MatchType };

export const MatchStatus: React.FC<MatchStatusProps> = ({ match }) => {
  if (match.status === 'SCHEDULED') {
    return (
      <div className="border rounded flex items-center justify-center py-2">
        {match.dateTime.toISOString().split('T')[0]}
      </div>
    );
  }

  if (match.status === 'FINISHED') {
    return (
      <div className="flex items-center justify-center" style={{ gap: '1px' }}>
        <div className="w-8 h-8 bg-red-700 text-white flex items-center justify-center">
          {match.homeScore}
        </div>
        <div className="w-8 h-8 bg-red-700 text-white flex items-center justify-center">
          {match.awayScore}
        </div>
      </div>
    );
  }

  return <></>;
};

export type MatchHomeTeamProps = { match: MatchType };

export const MatchHomeTeam: React.FC<MatchHomeTeamProps> = ({ match }) => {
  return (
    <div className="flex items-center justify-end">
      <Link href={`/teams/${match.homeId}`} passHref>
        <div className="inline-flex items-center gap-2 cursor-pointer">
          <p className="block md:hidden font-medium">{match.homeId}</p>
          <p className="hidden md:block font-medium truncate">{match.homeId}</p>
          <Logo teamId={match.homeId} className="w-8 h-8" />
        </div>
      </Link>
    </div>
  );
};

export type MatchAwayTeamProps = { match: MatchType };

export const MatchAwayTeam: React.FC<MatchAwayTeamProps> = ({ match }) => {
  return (
    <div className="flex items-center justify-start">
      <Link href={`/teams/${match.awayId}`} passHref>
        <div className="inline-flex items-center gap-2 cursor-pointer">
          <Logo teamId={match.awayId} className="w-8 h-8" />
          <p className="hidden md:block font-medium truncate">{match.awayId}</p>
          <p className="block md:hidden font-medium">{match.awayId}</p>
        </div>
      </Link>
    </div>
  );
};

export type MatchProps = { match: MatchType; full?: boolean };

const Match: React.FC<MatchProps> = ({ match, full = false }) => {
  return (
    <div
      className={`grid grid-cols-3 md:grid-cols-5 gap-8 items-center ${
        full ? 'lg:grid-cols-7 xl:grid-cols-9' : ''
      }`}
    >
      <div
        className={`col-span-1 md:col-span-2 ${
          full ? 'lg:col-span-3 xl:col-span-4' : ''
        }`}
      >
        <MatchHomeTeam match={match} />
      </div>
      <div className="col-span-1">
        <MatchStatus match={match} />
      </div>
      <div
        className={`col-span-1 md:col-span-2 ${
          full ? 'lg:col-span-3 xl:col-span-4' : ''
        }`}
      >
        <MatchAwayTeam match={match} />
      </div>
    </div>
  );
};

Match.displayName = 'Match';
Match.defaultProps = { full: false };

export default Match;
