import { Match, Team as TeamType } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { query } from '../../../../apollo';
import { GET_TEAM_WITH_RESULTS } from '../../../../apollo/graphql';
import MatchesByRound from '../../../../components/organisms/MatchesByRound';
import TeamTemplate from '../../../../components/templates/TeamTemplate';
import { messagesByLocales } from '../../../../messages';

export type TeamResultsProps = { results: Match[]; team: TeamType };

const TeamResults: NextPage<TeamResultsProps> = ({ results, team }) => {
  return (
    <TeamTemplate team={team} active="results">
      <MatchesByRound matches={results} />
    </TeamTemplate>
  );
};

type TeamWithResults = TeamType & { results: Match[] };

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const teamId = context.params?.id || '';
  const data: { team: TeamWithResults } = await query<{
    team: TeamWithResults;
  }>(GET_TEAM_WITH_RESULTS, { teamId }, 'GET_TEAM_WITH_RESULTS');

  const team = data.team || {};
  const results = data.team.results || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, results, team } };
};

export default TeamResults;
