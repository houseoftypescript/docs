import { Team } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';

type Data = {
  teams: Team[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const teams: Team[] = await prisma.team.findMany();
    return response.status(200).json({ teams });
  }
  return response.status(405);
};

export default handler;
