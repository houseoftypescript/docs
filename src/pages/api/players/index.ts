import { Player } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';

type Data = {
  players: Player[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const players: Player[] = await prisma.player.findMany();
    return response.status(200).json({ players });
  }
  return response.status(405);
};

export default handler;
