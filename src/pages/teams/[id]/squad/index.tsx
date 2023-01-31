import { Player, Team as TeamType } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { query } from '../../../../apollo';
import { GET_TEAM_WITH_PLAYERS } from '../../../../apollo/graphql';
import TeamTemplate from '../../../../components/templates/TeamTemplate';
import { messagesByLocales } from '../../../../messages';

const TeamSquad: NextPage<{ team: TeamType; players: Player[] }> = ({
  players = [],
  team,
}) => {
  const t = useTranslations();

  return (
    <TeamTemplate team={team} active="squad">
      <div className="border rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <td className="py-4 px-2 capitalize" align="center">
                {t('no')}
              </td>
              <td className="py-4 px-2 capitalize">{t('fullName')}</td>
              <td className="py-4 px-2 capitalize">{t('position')}</td>
            </tr>
          </thead>
          <tbody>
            {players.map((player: Player, index: number, array: Player[]) => {
              const { shirtNumber, id } = player;
              const last = array.length - 1 === index;
              return (
                <tr key={id} className={last ? '' : 'border-b'}>
                  <td className="py-4 px-2" align="center">
                    {shirtNumber}
                  </td>
                  <td className="py-4 px-2">{player.fullName}</td>
                  <td className="py-4 px-2">{player.positionId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TeamTemplate>
  );
};

type TeamWithPlayers = TeamType & { players: Player[] };

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const teamId = context.params?.id || '';
  const data: { team: TeamWithPlayers } = await query<{
    team: TeamWithPlayers;
  }>(GET_TEAM_WITH_PLAYERS, { teamId }, 'GET_TEAM_WITH_PLAYERS');

  const team = data.team || {};
  const players = data.team.players || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, players, team } };
};

export default TeamSquad;
