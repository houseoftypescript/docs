import { Standing, Status, Tier } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';
import { CURRENT_SEASON, CURRENT_TIER } from '../../constants';
import { STATUS_CODES } from 'http';

export const getStandings = async (
  {
    season = CURRENT_SEASON,
    status = Status.SCHEDULED,
    teamId = '',
    tier = CURRENT_TIER,
  }: {
    season?: number;
    status?: Status;
    teamId?: string;
    tier?: Tier;
  } = {
    season: CURRENT_SEASON,
    status: Status.SCHEDULED,
    teamId: '',
    tier: CURRENT_TIER,
  }
): Promise<Standing[]> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('season', season.toString());
  urlSearchParams.set('status', status);
  urlSearchParams.set('teamId', teamId);
  urlSearchParams.set('tier', tier);
  const url = `${API}/standings?${urlSearchParams.toString()}`;
  const { data } = await axios.get<{ standings: Standing[] }>(url);
  return data.standings || [];
};

export const getStanding = async (id: string): Promise<Standing> => {
  const { data } = await axios.get<{ standing: Standing }>(
    `${API}/standings/${id}`
  );
  return data.standing || {};
};
