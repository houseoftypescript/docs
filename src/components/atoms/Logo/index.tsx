import React from 'react';
import { CDN_IMAGE_URL } from '../../../constants';

export type LogoProps = { teamId: string; className?: string };

export const Logo: React.FC<LogoProps> = ({ teamId, className = '' }) => {
  const backgroundImage: string = [
    `url(${CDN_IMAGE_URL}/teams/png/${teamId}.png)`,
    `url(${CDN_IMAGE_URL}/teams/jpg/${teamId}.jpg)`,
  ].join(', ');

  return (
    <div
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage }}
    />
  );
};

Logo.displayName = 'Logo';
Logo.defaultProps = { className: '' };

export default Logo;
