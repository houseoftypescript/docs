import Container from '@mui/material/Container';
import { Standing, Tier } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { query } from '../../apollo';
import { GET_STANDINGS } from '../../apollo/graphql';
import Filter from '../../components/organisms/LeagueFilter';
import Teams from '../../components/organisms/Teams';
import PageTemplate from '../../components/templates/PageTemplate';
import { CURRENT_SEASON, CURRENT_TIER, SEASONS, TIERS } from '../../constants';
import useUpdateEffect from '../../hooks/use-update-effect';
import { messagesByLocales } from '../../messages';
import { getQueryParam } from '../../utils/get-query-param';
import { getLogger } from '../../libs/log';

export type TeamsProps = {
  apiURL: string;
  tier: string;
  season: number;
  seasons: number[];
  standings: Standing[];
};

const TeamsPage: NextPage<TeamsProps> = ({
  tier: currentTier,
  season: currentSeason,
  seasons,
  standings: currentTeams,
}) => {
  const t = useTranslations();
  const router = useRouter();

  const [tier, setTier] = useState<string>(currentTier);
  const [season, setSeason] = useState<number>(currentSeason);
  const [teams, setTeams] = useState<Standing[]>(currentTeams);

  const changeTier = useCallback((tier: string) => setTier(tier), [setTier]);
  const changeSeason = useCallback(
    (season: number) => setSeason(season),
    [setSeason]
  );

  useUpdateEffect(() => {
    const getTeams = async () => {
      router.push({ query: { tier, season } }, undefined, { shallow: true });
      const data: { standings: Standing[] } = await query<{
        standings: Standing[];
      }>(GET_STANDINGS, { season, tier }, 'GET_STANDINGS');
      const teams: Standing[] = data.standings;
      setTeams(teams);
    };
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, season]);

  const title = t('teams');
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
        <Teams teams={teams} />
      </Container>
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'en',
  query: contextQuery,
}: GetServerSidePropsContext) => {
  const logger = getLogger('teams');

  // Season
  let querySeason = parseInt(
    getQueryParam(contextQuery, 'season', CURRENT_SEASON.toString()),
    10
  );
  if (!SEASONS.includes(querySeason)) {
    querySeason = CURRENT_SEASON;
  }
  // Tier
  let queryTier: Tier = getQueryParam(
    contextQuery,
    'tier',
    CURRENT_TIER
  ) as Tier;
  if (!TIERS.includes(queryTier)) {
    queryTier = CURRENT_TIER;
  }

  const data: { standings: Standing[] } = await query<{
    standings: Standing[];
  }>(GET_STANDINGS, { season: querySeason, tier: queryTier }, 'GET_STANDINGS');
  logger.info('data', data);
  const standings: Standing[] = data.standings;

  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return {
    props: {
      messages,
      tier: queryTier,
      season: querySeason,
      seasons: SEASONS,
      standings,
    },
  };
};

export default TeamsPage;
