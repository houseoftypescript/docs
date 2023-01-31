import { Match } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';

type Data = {
  matches: Match[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const matches: Match[] = await prisma.match.findMany();
    return response.status(200).json({ matches });
  }
  return response.status(405);
};

export default handler;
