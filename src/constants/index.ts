import { Tier } from '@prisma/client';

export const CURRENT_TIER = 'TIER_ONE';
export const TIERS: Tier[] = ['TIER_CUP', 'TIER_ONE', 'TIER_TWO', 'TIER_THREE'];

export const CURRENT_SEASON = new Date().getFullYear();
const START_SEASON = 2012;
export const SEASONS: number[] = Array.from(
  Array(CURRENT_SEASON + 1 - START_SEASON).keys()
)
  .map((index: number) => START_SEASON + index)
  .reverse();

export const COMPETITION_OPTIONS: { value: Tier; key: string }[] = [
  { value: 'TIER_ONE', key: 'vleague1' },
  { value: 'TIER_TWO', key: 'vleague2' },
  { value: 'TIER_THREE', key: 'vleague3' },
  { value: 'TIER_CUP', key: 'nationalCup' },
];

export const CDN_IMAGE_URL =
  'https://raw.githubusercontent.com/hieudoanm/cdn/master/images/vleague';
