import Container from '@mui/material/Container';
import { Match } from '../../../@types/vleague';
import Filter from '../../organisms/LeagueFilter';
import MatchesByRound from '../../organisms/MatchesByRound';
import PageTemplate from '../PageTemplate';

export type MatchesTemplateProps = {
  title: string;
  tier: string;
  season: number;
  seasons: number[];
  changeTier: (tier: string) => void;
  changeSeason: (season: number) => void;
  matches: Match[];
};

const MatchesTemplate: React.FC<MatchesTemplateProps> = ({
  title,
  tier,
  season,
  seasons,
  changeTier,
  changeSeason,
  matches,
}) => {
  return (
    <PageTemplate title={title}>
      <Container className="py-16">
        <section className="mb-16">
          <Filter
            tier={tier}
            season={season}
            seasons={seasons}
            changeTier={changeTier}
            changeSeason={changeSeason}
          />
        </section>
        <MatchesByRound matches={matches} />
      </Container>
    </PageTemplate>
  );
};

export default MatchesTemplate;
