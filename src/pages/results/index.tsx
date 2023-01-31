import { Match, Tier } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { query } from '../../apollo';
import { GET_MATCHES } from '../../apollo/graphql';
import MatchesTemplate from '../../components/templates/MatchesTemplate';
import { CURRENT_SEASON, CURRENT_TIER, SEASONS, TIERS } from '../../constants';
import useUpdateEffect from '../../hooks/use-update-effect';
import { messagesByLocales } from '../../messages';
import { getQueryParam } from '../../utils/get-query-param';

export type ResultsPageProps = {
  tier: string;
  season: number;
  seasons: number[];
  matches: Match[];
};

const ResultsPage: NextPage<ResultsPageProps> = ({
  tier: currentTier,
  season: currentSeason,
  seasons,
  matches: currentMatches,
}) => {
  const t = useTranslations();
  const router = useRouter();

  const [tier, setTier] = useState<string>(currentTier);
  const [season, setSeason] = useState<number>(currentSeason);
  const [matches, setMatches] = useState<Match[]>(currentMatches);

  const changeTier = useCallback((tier: string) => setTier(tier), [setTier]);
  const changeSeason = useCallback(
    (season: number) => setSeason(season),
    [setSeason]
  );

  useUpdateEffect(() => {
    const getMatches = async () => {
      router.push({ query: { tier, season } }, undefined, { shallow: true });

      const data: { matches: Match[] } = await query<{
        matches: Match[];
      }>(GET_MATCHES, { season, tier, status: 'FINISHED' }, 'GET_MATCHES');
      const matches: Match[] = data.matches || [];

      setMatches(matches);
    };
    getMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, season]);

  const title = t('results');
  return (
    <MatchesTemplate
      title={title}
      tier={tier}
      season={season}
      seasons={seasons}
      changeTier={changeTier}
      changeSeason={changeSeason}
      matches={matches}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<{ season: string; tier: string }>
) => {
  let querySeason = parseInt(
    getQueryParam(context.query, 'season', CURRENT_SEASON.toString()),
    10
  );
  if (!SEASONS.includes(querySeason)) {
    querySeason = CURRENT_SEASON;
  }

  let queryTier: Tier = getQueryParam(
    context.query,
    'tier',
    CURRENT_TIER
  ) as Tier;
  if (!TIERS.includes(queryTier)) {
    queryTier = CURRENT_TIER;
  }

  const data: { matches: Match[] } = await query<{ matches: Match[] }>(
    GET_MATCHES,
    { season: querySeason, tier: queryTier, status: 'FINISHED' },
    'GET_MATCHES'
  );
  const matches: Match[] = data.matches || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return {
    props: {
      messages,
      tier: queryTier,
      season: querySeason,
      seasons: SEASONS,
      matches,
    },
  };
};

export default ResultsPage;
