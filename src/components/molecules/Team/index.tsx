import ArrowForward from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { Standing } from '../../../@types/vleague';
import Logo from '../../atoms/Logo';

export type TeamProps = {
  team: Standing;
};

const Team: React.FC<TeamProps> = ({ team }) => {
  const t = useTranslations();

  return (
    <Card>
      <div
        style={{
          paddingBottom: '50%',
          backgroundImage: `url(https://www.premierleague.com/resources/prod/89ca2b2-3842/i/stadiums/club-index/t3@x2.jpg)`,
        }}
        className="relative w-full border-b bg-cover bg-center"
      >
        <div
          className="absolute w-32 h-32 rounded-full bg-white border shadow m-auto flex items-center justify-center left-0 right-0"
          style={{ bottom: '-4rem' }}
        >
          <Logo teamId={team.id} className="w-20 h-20" />
        </div>
      </div>
      <CardContent className="text-center">
        <div className="pt-16">
          <h4 className="text-xl font-semibold truncate">{team.team}</h4>
        </div>
      </CardContent>
      <CardActions>
        <Link href={`/teams/${team.id}`} passHref>
          <div className="mx-auto pb-8">
            <Button variant="contained">
              <span>{t('clubProfile')}</span>
              <ArrowForward className="inline-block ml-2" />
            </Button>
          </div>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Team;
