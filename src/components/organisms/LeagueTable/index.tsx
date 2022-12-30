import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Standing } from '../../../@types/vleague';
import Logo from '../../atoms/Logo';

const POSITIONS = [1, 3];

export type LeagueTableProps = { active: string; standings: Standing[] };

const LeagueTable: React.FC<LeagueTableProps> = ({ active, standings }) => {
  const t = useTranslations();

  if (standings.length === 0) {
    return <div className="text-center py-16">No Current Standings</div>;
  }

  return (
    <div className="overflow-y-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('pos')}</div>
              <div className="hidden md:block capitalize">{t('position')}</div>
            </td>
            <td></td>
            <td className="py-4 px-2">
              <div className="block md:hidden capitalize">{t('team')}</div>
              <div className="hidden md:block capitalize">{t('team')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('pl')}</div>
              <div className="hidden md:block capitalize">{t('played')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('w')}</div>
              <div className="hidden md:block capitalize">{t('win')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('d')}</div>
              <div className="hidden md:block capitalize">{t('draw')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('l')}</div>
              <div className="hidden md:block capitalize">{t('lost')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('g')}</div>
              <div className="hidden md:block capitalize">{t('goals')}</div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('ga')}</div>
              <div className="hidden md:block capitalize">
                {t('goalsAgainst')}
              </div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('gd')}</div>
              <div className="hidden md:block capitalize">
                {t('goalsDifference')}
              </div>
            </td>
            <td className="py-4 px-2" align="center">
              <div className="block md:hidden uppercase">{t('pts')}</div>
              <div className="hidden md:block capitalize">{t('points')}</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing: Standing) => {
            const activeColor: string =
              active === standing.teamId && active !== ''
                ? `bg-red-700 text-white`
                : ``;
            const borderBottom: string = POSITIONS.includes(standing.position)
              ? 'border-gray-400'
              : '';
            return (
              <tr
                key={standing.id}
                className={`${activeColor} ${borderBottom} border-b`}
              >
                <td align="center" className="py-4 px-2 text-center">
                  {standing.position}
                </td>
                <td align="center">
                  <Logo teamId={standing.teamId} className="w-8 h-8" />
                </td>
                <td className="py-4 px-2">
                  <Link href={`/teams/${standing.teamId}`} passHref>
                    <div className="cursor-pointer font-medium">
                      <p className="hidden md:block">{standing.team}</p>
                      <p className="block md:hidden">{standing.teamId}</p>
                    </div>
                  </Link>
                </td>
                <td align="center" className="py-4 px-2 text-center">
                  {standing.played}
                </td>
                <td align="center" className="py-4 px-2">
                  <div className="text-center">{standing.won}</div>
                </td>
                <td align="center" className="py-4 px-2">
                  <div className="text-center">{standing.drawn}</div>
                </td>
                <td align="center" className="py-4 px-2">
                  <div className="text-center">{standing.lost}</div>
                </td>
                <td align="center" className="py-4 px-2">
                  <div className="text-center">{standing.goals}</div>
                </td>
                <td align="center" className="py-4 px-2">
                  {standing.goalsAgainst}
                </td>
                <td align="center" className="py-4 px-2">
                  {standing.goalsDifference > 0 ? '+' : ''}
                  {standing.goalsDifference}
                </td>
                <td align="center" className="py-4 px-2">
                  <div className="text-center font-bold">{standing.points}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LeagueTable;
