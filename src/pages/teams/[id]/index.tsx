import { Standing, Team as TeamType } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { query } from '../../../apollo';
import { GET_TEAM_WITH_STANDINGS } from '../../../apollo/graphql';
import LeagueTable from '../../../components/organisms/LeagueTable';
import TeamTemplate from '../../../components/templates/TeamTemplate';
import { messagesByLocales } from '../../../messages';

const TeamPage: NextPage<{ standings: Standing[]; team: TeamType }> = ({
  standings,
  team,
}) => {
  return (
    <TeamTemplate team={team} active="">
      <section className="border rounded overflow-hidden shadow">
        <LeagueTable active={team.id} standings={standings} />
      </section>
    </TeamTemplate>
  );
};

type TeamWithStandings = TeamType & { standings: Standing[] };

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const teamId = context.params?.id || '';
  const data: { team: TeamWithStandings } = await query<{
    team: TeamWithStandings;
  }>(GET_TEAM_WITH_STANDINGS, { teamId }, 'GET_TEAM_WITH_STANDINGS');

  const team = data.team || {};
  const standings = data.team.standings || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, standings, team } };
};

export default TeamPage;
