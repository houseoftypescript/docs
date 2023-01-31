import { Match, Status, Tier } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';
import { CURRENT_SEASON, CURRENT_TIER } from '../../constants';

export const getMatches = async (
  {
    limit = 4,
    season = CURRENT_SEASON,
    status = Status.SCHEDULED,
    teamId = '',
    tier = CURRENT_TIER,
  }: {
    limit?: number;
    season?: number;
    status?: Status;
    teamId?: string;
    tier?: Tier;
  } = { limit: 4 }
): Promise<Match[]> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('limit', limit.toString());
  urlSearchParams.set('season', season.toString());
  urlSearchParams.set('status', status);
  urlSearchParams.set('teamId', teamId);
  urlSearchParams.set('tier', tier);
  const url = `${API}/matches?${urlSearchParams.toString()}`;
  const { data } = await axios.get<{ matchs: Match[] }>(url);
  return data.matchs || [];
};

export const getMatch = async (id: string): Promise<Match> => {
  const { data } = await axios.get<{ match: Match }>(`${API}/matches/${id}`);
  return data.match || {};
};
