import ArrowForward from '@mui/icons-material/ArrowForward';
import Stadium from '@mui/icons-material/Stadium';
import Button from '@mui/material/Button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Match as MatchType } from '../../../@types/vleague';
import Match from '../../molecules/Match';

export type MatchDetailsProps = { match: MatchType };

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  const t = useTranslations();

  return (
    <div key={match.id} className="py-4 border-b">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8">
        <div className="col-span-1 md:col-span-2">
          <Match match={match} />
        </div>
        <div className="col-span-1">
          <div className="text-center md:text-left">
            <Stadium className="inline-block mr-2" />
            {match.stadiumId}
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-center md:text-right">
            <Link href={`/matches/${match.id}`} passHref>
              <div className="flex items-center justify-center md:justify-end">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className="rounded border py-2 px-4"
                >
                  <span>{t('details')}</span>
                  <ArrowForward className="inline-block ml-2" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

MatchDetails.displayName = 'MatchDetails';

export default MatchDetails;
