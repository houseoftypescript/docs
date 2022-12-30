import { Position } from '@prisma/client';
import axios from 'axios';
import { API } from '../../environments';

export const getPositions = async (): Promise<Position[]> => {
  const { data } = await axios.get<{ positions: Position[] }>(
    `${API}/positions`
  );
  return data.positions || [];
};

export const getPosition = async (id: string): Promise<Position> => {
  const { data } = await axios.get<{ position: Position }>(
    `${API}/positions/${id}`
  );
  return data.position || {};
};
