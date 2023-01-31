import { Match, Team as TeamType } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { query } from '../../../../apollo';
import { GET_TEAM_WITH_MATCHES } from '../../../../apollo/graphql';
import MatchesByRound from '../../../../components/organisms/MatchesByRound';
import TeamTemplate from '../../../../components/templates/TeamTemplate';
import { messagesByLocales } from '../../../../messages';

export type TeamMatchesProps = { matches: Match[]; team: TeamType };

const TeamMatches: NextPage<TeamMatchesProps> = ({ matches, team }) => {
  return (
    <TeamTemplate team={team} active="matches">
      <MatchesByRound matches={matches} />
    </TeamTemplate>
  );
};

type TeamWithMatches = TeamType & { matches: Match[] };

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const teamId = context.params?.id || '';
  const data: { team: TeamWithMatches } = await query<{
    team: TeamWithMatches;
  }>(GET_TEAM_WITH_MATCHES, { teamId }, 'GET_TEAM_WITH_MATCHES');

  const team = data.team || {};
  const matches = data.team.matches || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, matches, team } };
};

export default TeamMatches;
