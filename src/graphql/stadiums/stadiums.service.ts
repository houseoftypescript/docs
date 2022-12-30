import { Stadium } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';

export const getStadiums = async (): Promise<Stadium[]> => {
  const { data } = await axios.get<{ stadiums: Stadium[] }>(`${API}/stadiums`);
  return data.stadiums || [];
};

export const getStadium = async (id: string): Promise<Stadium> => {
  const { data } = await axios.get<{ stadium: Stadium }>(
    `${API}/stadiums/${id}`
  );
  return data.stadium || {};
};
