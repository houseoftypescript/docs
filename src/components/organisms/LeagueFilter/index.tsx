import { InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useTranslations } from 'next-intl';
import React from 'react';
import { COMPETITION_OPTIONS } from '../../../constants';

type LeagueFilterProps = {
  tier: string;
  season: number;
  seasons: number[];
  changeTier: (tier: string) => void;
  changeSeason: (season: number) => void;
};

const LeagueFilter: React.FC<LeagueFilterProps> = ({
  tier,
  season,
  seasons,
  changeTier,
  changeSeason,
}) => {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <FormControl fullWidth>
          <InputLabel id="competition" className="capitalize">
            {t('competition')}
          </InputLabel>
          <Select
            labelId="competition"
            id="tier"
            value={tier}
            label={t('competition')}
            onChange={(event) => {
              changeTier(event.target.value);
            }}
          >
            {COMPETITION_OPTIONS.map((option) => {
              return (
                <MenuItem
                  key={`option-tier-${option.key}`}
                  value={option.value}
                >
                  {t(option.key)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="season" className="capitalize">
            {t('season')}
          </InputLabel>
          <Select
            labelId="season"
            id="season"
            value={season}
            label={t('season')}
            onChange={(event) => {
              const season = parseInt(event?.target?.value?.toString(), 10);
              changeSeason(season);
            }}
          >
            {seasons.map((season) => {
              return (
                <MenuItem key={`option-season-${season}`} value={season}>
                  {season}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

LeagueFilter.displayName = 'LeagueFilter';

export default LeagueFilter;
