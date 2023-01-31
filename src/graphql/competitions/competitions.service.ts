import { Competition } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';

export const getCompetitions = async (): Promise<Competition[]> => {
  const { data } = await axios.get<{ competitions: Competition[] }>(
    `${API}/competitions`
  );
  return data.competitions || [];
};

export const getCompetition = async (id: string): Promise<Competition> => {
  const { data } = await axios.get<{ competition: Competition }>(
    `${API}/competitions/${id}`
  );
  return data.competition || {};
};
