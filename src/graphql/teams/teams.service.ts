import { Team, Tier } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';

export const getTeams = async ({
  season,
  tier,
}: {
  season: number;
  tier: Tier;
}): Promise<Team[]> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('season', season.toString());
  urlSearchParams.set('tier', tier);
  const url = `${API}/teams?${urlSearchParams.toString()}`;
  const { data } = await axios.get<{ teams: Team[] }>(url);
  return data.teams || [];
};

export const getTeam = async (id: string): Promise<Team> => {
  const { data } = await axios.get<{ team: Team }>(`${API}/teams/${id}`);
  return data.team || {};
};
