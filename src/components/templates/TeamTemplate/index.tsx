import CalendarMonth from '@mui/icons-material/CalendarMonth';
import History from '@mui/icons-material/History';
import People from '@mui/icons-material/People';
import Stadium from '@mui/icons-material/Stadium';
import TableView from '@mui/icons-material/TableView';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Team } from '../../../@types/vleague';
import Logo from '../../atoms/Logo';
import PageTemplate from '../PageTemplate';

const tiers: Record<string, string> = {
  TIER_ONE: 'vleague1',
  TIER_TWO: 'vleague2',
};

export type TeamTemplateProps = {
  active: string;
  team: Team;
  children?: React.ReactNode;
};

const TeamTemplate: React.FC<TeamTemplateProps> = ({
  active,
  team,
  children = <></>,
}) => {
  const t = useTranslations();

  const title = t('team');

  const tierKey = tiers[team.tier];

  return (
    <PageTemplate title={title}>
      <Container className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          <div className="col-span-1">
            <div className="w-full relative" style={{ paddingBottom: '100%' }}>
              <div className="absolute rounded-full w-full h-full border flex items-center justify-center shadow">
                <Logo teamId={team.id} className="w-2/3	h-2/3" />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 lg:col-span-5">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-3xl">{team.fullName}</h2>
              {team.manager !== null && (
                <p className="mt-2">
                  <VerifiedUser className="inline-block mr-2" />
                  <span className="capitalize">{t('manager')}: </span>
                  <span className="font-medium">{team.manager}</span>
                </p>
              )}
              {team.stadium !== null && (
                <p className="mt-2">
                  <Stadium className="inline-block mr-2" />
                  <span className="capitalize">{t('stadium')}: </span>
                  <span className="font-medium">{team.stadium}</span>
                </p>
              )}
              {tierKey !== null && (
                <p className="mt-2">
                  <WorkspacePremium className="inline-block mr-2" />
                  <span className="font-medium">{t(tierKey)}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
      <div className="border-b border-gray-200">
        <Container className="pt-16">
          <div className="overflow-auto">
            <div className="flex gap-1">
              {[
                { pathname: '', icon: <TableView />, key: 'position' },
                {
                  pathname: 'matches',
                  icon: <CalendarMonth />,
                  key: 'matches',
                },
                { pathname: 'results', icon: <History />, key: 'results' },
                { pathname: 'squad', icon: <People />, key: 'squad' },
              ].map(({ pathname, icon, key }) => {
                const activeClass =
                  active === pathname
                    ? 'md:font-semibold'
                    : 'bg-gray-100 text-gray-900';
                return (
                  <Link
                    key={key}
                    href={`/teams/${team.id}/${pathname}`}
                    passHref
                  >
                    <div
                      className={`p-4 border-t border-r border-l border-gray-200 cursor-pointer rounded-t-lg overflow-hidden ${activeClass}`}
                    >
                      <div className="block md:hidden">{icon}</div>
                      <div className="hidden md:block capitalize">{t(key)}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-16">{children}</Container>
    </PageTemplate>
  );
};

TeamTemplate.displayName = 'TeamTemplate';
TeamTemplate.defaultProps = { children: <></> };

export default TeamTemplate;
