import { useTranslations } from 'next-intl';
import { Match } from '../../../@types/vleague';
import Round from '../Round';

export type MatchesByRoundProps = {
  matches: Match[];
};

const MatchesByRound: React.FC<MatchesByRoundProps> = ({ matches = [] }) => {
  const t = useTranslations();

  if (matches.length === 0) {
    return (
      <div className="text-center capitalize">{t('noUpcomingMatches')}</div>
    );
  }

  const rounds: number[] = [
    ...new Set(matches.map((match: Match) => match.round)),
  ];
  const matchesByRounds: Record<string, Match[]> = {};
  for (const round of rounds) {
    matchesByRounds[round] = matches.filter((match) => match.round === round);
  }

  return (
    <section>
      {Object.keys(matchesByRounds).map((round: string) => {
        const matchesByRound = matchesByRounds[round] || [];
        const dates: string[] = [
          ...new Set(
            matchesByRound.map(
              (match: Match) => match.dateTime.toISOString().split('T')[0]
            )
          ),
        ];
        const matchesByDates: Record<string, Match[]> = {};
        for (const date of dates) {
          matchesByRounds[date] = matches.filter(
            (match) => match.dateTime.toISOString().split('T')[0] === date
          );
        }
        return (
          <Round
            key={`round-${round}`}
            round={round}
            matchesByDates={matchesByDates}
          />
        );
      })}
    </section>
  );
};

export default MatchesByRound;
