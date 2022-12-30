import { Player } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';

export const getPlayers = async (
  {
    teamId = '',
  }: {
    teamId?: string;
  } = { teamId: '' }
): Promise<Player[]> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('teamId', teamId);
  const url = `${API}/players?${urlSearchParams.toString()}`;
  const { data } = await axios.get<{ players: Player[] }>(url);
  return data.players || [];
};

export const getPlayer = async (id: string): Promise<Player> => {
  const { data } = await axios.get<{ player: Player }>(`${API}/players/${id}`);
  return data.player || {};
};
