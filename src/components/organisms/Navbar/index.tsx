import { Team } from '@prisma/client';
import React from 'react';
import ResponsiveAppBar from '../../molecules/ResponsiveAppBar';
import TeamsBar from '../../molecules/TeamsBar';

export type NavBarProps = {
  active: string;
  teams: Team[];
};

const NavBar: React.FC<NavBarProps> = ({ active, teams }) => {
  return (
    <nav className="border border-white">
      <TeamsBar teams={teams} />
      <ResponsiveAppBar title="V.LEAGUE" active={active} />
    </nav>
  );
};

NavBar.displayName = 'NavBar';

export default NavBar;
