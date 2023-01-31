import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';
import React from 'react';
import { CDN_IMAGE_URL } from '../../../constants';

const Sponsors: React.FC = () => {
  const t = useTranslations();

  const sponsors = [...Array(5).keys()];

  return (
    <div className="border-t">
      <Container className="py-16">
        <h2 className="text-3xl text-center mb-16 uppercase">
          {t('sponsorship')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {sponsors.map((sponsor: number) => {
            const index = sponsor + 1;
            const backgroundImage: string = `url(${CDN_IMAGE_URL}/sponsors/sponsor-${index}.jpg)`;
            return (
              <div key={`sponsor-${sponsor}`}>
                <div
                  className="h-32 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage }}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Sponsors;
