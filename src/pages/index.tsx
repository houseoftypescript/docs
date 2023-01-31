import ArrowForward from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Match as MatchType, Standing } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { Video } from '../@types/vleague';
import { query } from '../apollo';
import { GET_HOME } from '../apollo/graphql';
import Carousel from '../components/atoms/Carousel';
import Logo from '../components/atoms/Logo';
import Match from '../components/molecules/Match';
import Videos from '../components/organisms/Videos';
import PageTemplate from '../components/templates/PageTemplate';
import { CURRENT_TIER } from '../constants';
import { messagesByLocales } from '../messages';

type MatchesProps = { matches: MatchType[] };

const Matches: React.FC<MatchesProps> = ({ matches = [] }) => {
  const t = useTranslations();

  const dates = [
    ...new Set(
      matches.map(
        (matches: MatchType) => matches.dateTime.toISOString().split('T')[0]
      )
    ),
  ];
  const matchesByDates: Record<string, MatchType[]> = {};
  for (const date of dates) {
    matchesByDates[date] = matches.filter(
      (match) => match.dateTime.toISOString().split('T')[0] === date
    );
  }

  return (
    <div className="border rounded overflow-hidden shadow">
      <div className="bg-gray-50 text-gray-700 text-center py-4 border-b uppercase">
        {t('matches')}
      </div>
      <>
        {Object.keys(matchesByDates).map((date) => {
          const matchesByDate = matchesByDates[date];
          return (
            <div key={`date-${date}`}>
              <div className="text-center pt-4 font-medium">{date}</div>
              {matchesByDate.map((match: MatchType) => {
                return (
                  <div key={`match-${match.id}`} className="border-b py-4">
                    <Match match={match} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    </div>
  );
};

type StandingsProps = { standings: Standing[] };

const Standings: React.FC<StandingsProps> = ({ standings }) => {
  const t = useTranslations();

  return (
    <div className="border rounded overflow-x-auto shadow">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700">
          <tr className="border-b">
            <td className="py-4 uppercase" align="center">
              {t('pos')}
            </td>
            <td></td>
            <td className="py-4 uppercase">{t('team')}</td>
            <td className="py-4 uppercase" align="center">
              {t('pl')}
            </td>
            <td className="py-4 uppercase" align="center">
              {t('gd')}
            </td>
            <td className="py-4 uppercase" align="center">
              {t('pts')}
            </td>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing: Standing) => {
            return (
              <tr key={`standing-${standing.id}`} className="border-b">
                <td className="py-2 " align="center">
                  {standing.ranking}
                </td>
                <td className="py-2" align="center">
                  <Logo teamId={standing.teamId} className="w-8 h-8" />
                </td>
                <td className="py-2 font-medium">
                  <Link href={`/teams/${standing.teamId}`} passHref>
                    <span className="cursor-pointer">
                      <span className="inline md:hidden">
                        {standing.teamId}
                      </span>
                      <span className="hidden md:inline">
                        {standing.teamId}
                      </span>
                    </span>
                  </Link>
                </td>
                <td className="py-2" align="center">
                  {standing.played}
                </td>
                <td className="py-2" align="center">
                  {standing.goalsDifference > 0 ? '+' : ''}
                  {standing.goalsDifference}
                </td>
                <td className="py-2 font-medium" align="center">
                  {standing.points}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="p-2">
              <Link href="/tables" passHref>
                <div className="mx-auto">
                  <Button variant="contained" className="w-full">
                    <span className="capitalize">{t('viewAllTables')}</span>
                    <ArrowForward className="ml-2 inline-block" />
                  </Button>
                </div>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export type HomePageProps = {
  matches: MatchType[];
  standings: Standing[];
  videos: Video[];
};

const HomePage: NextPage<HomePageProps> = ({ matches, standings, videos }) => {
  const t = useTranslations();

  return (
    <PageTemplate>
      <Carousel />
      <div className="border-b">
        <Container className="py-16">
          <h2 className="text-3xl text-center mb-16 uppercase">
            {t('vleague1')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Matches matches={matches} />
            </div>
            <div>
              <Standings standings={standings} />
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-16">
        <h2 className="text-3xl text-center mb-16 uppercase">{t('videos')}</h2>
        <Videos videos={videos} />
      </Container>
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'en',
}: GetServerSidePropsContext) => {
  const season = new Date().getFullYear();

  const data = await query<{
    videos: Video[];
    standings: Standing[];
    matches: MatchType[];
  }>(
    GET_HOME,
    {
      maxResults: 4,
      season,
      tier: CURRENT_TIER,
      status: 'SCHEDULED',
      limit: 8,
      sortBy: 'date',
    },
    'GET_HOME'
  );
  const videos: Video[] = data.videos || [];
  const standings: Standing[] = data.standings || [];
  const matches: MatchType[] = data.matches || [];

  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, matches, standings, videos } };
};

export default HomePage;
