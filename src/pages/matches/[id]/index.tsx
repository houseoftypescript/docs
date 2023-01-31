import Container from '@mui/material/Container';
import { Match as MatchType } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';
import { query } from '../../../apollo';
import { GET_MATCH } from '../../../apollo/graphql';
import Logo from '../../../components/atoms/Logo';
import Match from '../../../components/molecules/Match';
import PageTemplate from '../../../components/templates/PageTemplate';
import { messagesByLocales } from '../../../messages';

type TeamFormProps = { teamId: string; form: MatchType[]; side: string };

const TeamForm: React.FC<TeamFormProps> = ({ teamId, form, side }) => {
  const justifySide = side === 'home' ? 'justify-end' : 'justify-start';
  const reverse = side === 'home' ? 'flex-row' : 'flex-row-reverse';
  return (
    <div className="flex flex-col border-t">
      {form.map((match: MatchType) => {
        const homeOrAway = match.homeId === teamId ? 'H' : 'A';
        const opponentTeam =
          match.homeId === teamId ? match.awayId : match.homeId;
        const opponentScore =
          match.homeId === teamId ? match.awayScore : match.homeScore;
        const teamScore =
          match.homeId === teamId ? match.homeScore : match.awayScore;
        const diffResult = teamScore > opponentScore ? 'W' : 'L';
        const result = teamScore === opponentScore ? 'D' : diffResult;
        const diffColor =
          teamScore > opponentScore ? 'bg-green-500' : 'bg-red-500';
        const color = teamScore === opponentScore ? 'bg-gray-500' : diffColor;
        return (
          <div key={match.id} className={`flex ${justifySide} border-b py-2`}>
            <div className={`inline-flex items-center gap-1 ${reverse}`}>
              <div>{teamScore}</div>
              <div>-</div>
              <div>{opponentScore}</div>
              <div>v</div>
              <div>{opponentTeam}</div>
              <div>
                <span className="font-semibold mx-3">{homeOrAway}</span>
              </div>
              <div className={`mx-2 w-8 h-8 text-white ${color} rounded-full`}>
                <div className="flex items-center justify-center h-full">
                  {result}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type MatchFormProps = {
  homeId: string;
  awayId: string;
  homeTeam: string;
  awayTeam: string;
  homeForm: MatchType[];
  awayForm: MatchType[];
};

const MatchForm: React.FC<MatchFormProps> = ({
  homeId = '',
  awayId = '',
  homeTeam = '',
  awayTeam = '',
  homeForm = [],
  awayForm = [],
}) => {
  const t = useTranslations();

  return (
    <Container className="py-16">
      <h2 className="text-center text-3xl uppercase mb-8">{t('form')}</h2>
      <div className="grid grid-cols-2">
        <div className="pb-2 flex justify-end items-center">
          <span className="font-semibold uppercase">{homeTeam}</span>
          <Logo teamId={homeId} className="w-8 h-8 mx-2" />
        </div>
        <div className="pb-2 flex justify-start items-center">
          <Logo teamId={awayId} className="w-8 h-8 mx-2" />
          <span className="font-semibold uppercase">{awayTeam}</span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <TeamForm teamId={homeId} form={homeForm} side="home" />
        </div>
        <div>
          <TeamForm teamId={awayId} form={awayForm} side="away" />
        </div>
      </div>
    </Container>
  );
};

type MatchHeadToHeadProps = {
  head2head: MatchType[];
};

const MatchHeadToHead: React.FC<MatchHeadToHeadProps> = ({ head2head }) => {
  const t = useTranslations();

  return (
    <div className="border-b">
      <Container className="py-16">
        <h2 className="text-center text-3xl uppercase mb-8">
          {t('headToHead')}
        </h2>
        <div className="flex flex-col gap-4">
          {head2head.map((match: MatchType) => {
            return (
              <div key={`match-${match.id}`}>
                <div className="mb-4 text-center">
                  <p className="font-medium mb-2">
                    {match.dateTime.toISOString()}
                  </p>
                  <p className="text-gray-500">{match.stadiumId}</p>
                </div>
                <div className="py-4 border-t border-b">
                  <div className="grid grid-cols-12">
                    <div className="col-span-1"></div>
                    <div className="col-span-10">
                      <Match full match={match} />
                    </div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export type MatchSectionProps = { match: MatchType };

const MatchSection: React.FC<MatchSectionProps> = ({ match }) => {
  return (
    <div className="border-b">
      <Container className="py-16">
        <div className="text-center">
          <p className="font-medium mb-2">{match.dateTime.toISOString()}</p>
          <p className="text-gray-500">{match.stadiumId}</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-8 items-center">
          <div className="col-span-1 md:col-span-3">
            <div className="flex justify-end items-center gap-4">
              <div className="text-2xl md:text-4xl uppercase leading-none">
                <p className="block md:hidden">{match.homeId}</p>
                <p className="hidden md:block">{match.homeId}</p>
              </div>
              <Logo teamId={match.homeId} className="w-8 h-8 md:w-32 md:h-32" />
            </div>
          </div>
          <div className="col-span-1">
            <div
              className="flex items-center justify-center"
              style={{ gap: '1px' }}
            >
              <div className="w-8 h-8 bg-red-700 text-white flex items-center justify-center">
                {match.homeScore === null ? '' : match.homeScore}
              </div>
              <div className="w-8 h-8 bg-red-700 text-white flex items-center justify-center">
                {match.awayScore === null ? '' : match.awayScore}
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3">
            <div className="flex justify-start items-center gap-4">
              <Logo teamId={match.awayId} className="md:w-32 md:h-32" />
              <div className="text-2xl md:text-4xl uppercase leading-none">
                <p className="block md:hidden">{match.awayId}</p>
                <p className="hidden md:block">{match.awayId}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export type MatchPageProps = {
  match: MatchType;
  head2head: MatchType[];
  homeForm: MatchType[];
  awayForm: MatchType[];
};

const MatchPage: NextPage<MatchPageProps> = ({
  match,
  head2head = [],
  homeForm = [],
  awayForm = [],
}) => {
  const t = useTranslations();

  const title = t('match');

  return (
    <PageTemplate title={title}>
      <MatchSection match={match} />
      <MatchHeadToHead head2head={head2head} />
      <MatchForm
        homeId={match.homeId}
        awayId={match.awayId}
        homeTeam={match.homeId}
        awayTeam={match.awayId}
        homeForm={homeForm}
        awayForm={awayForm}
      />
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const matchId = context.params?.id || '';

  const data: {
    match: {
      match: MatchType;
      head2head: MatchType[];
      homeForm: MatchType[];
      awayForm: MatchType[];
    };
  } = await query<{
    match: {
      match: MatchType;
      head2head: MatchType[];
      homeForm: MatchType[];
      awayForm: MatchType[];
    };
  }>(GET_MATCH, { matchId }, 'GET_MATCH');
  const match: MatchType = data.match.match || ({} as MatchType);
  const head2head: MatchType[] = data.match.head2head || [];
  const homeForm: MatchType[] = data.match.homeForm || [];
  const awayForm: MatchType[] = data.match.awayForm || [];

  const locale = context.locale || 'en';
  const messages = messagesByLocales[locale] || messagesByLocales.en;

  return { props: { messages, match, head2head, homeForm, awayForm } };
};

export default MatchPage;
