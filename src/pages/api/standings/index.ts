import { Standing } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';

type Data = {
  standings: Standing[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const standings: Standing[] = await prisma.standing.findMany();
    return response.status(200).json({ standings });
  }
  return response.status(405);
};

export default handler;
