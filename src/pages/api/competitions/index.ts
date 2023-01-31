import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';
import { Competition } from '@prisma/client';

type Data = {
  competitions: Competition[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const competitions: Competition[] = await prisma.competition.findMany();
    return response.status(200).json({ competitions });
  }
  return response.status(405);
};

export default handler;
