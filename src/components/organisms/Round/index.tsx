import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Match as MatchType } from '../../../@types/vleague';
import MatchDetails from '../MatchDetails';

export type RoundProps = {
  round: string;
  matchesByDates: Record<string, MatchType[]>;
};

const Round: React.FC<RoundProps> = ({ round, matchesByDates }) => {
  const t = useTranslations();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`matchday-${round}-content`}
        id={`matchday-${round}-header`}
      >
        <h2 className="font-semibold text-2xl capitalize">
          {t('round')} {round}
        </h2>
      </AccordionSummary>
      <AccordionDetails>
        {Object.keys(matchesByDates).map((date: string) => {
          const matchesByDate = matchesByDates[date] || [];
          return (
            <div key={date}>
              <div className="py-4 border-b">
                <h3 className="font-medium text-xl">{date}</h3>
              </div>
              <>
                {matchesByDate.map((match: MatchType) => {
                  return <MatchDetails key={match.id} match={match} />;
                })}
              </>
            </div>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

Round.displayName = 'Round';

export default Round;
