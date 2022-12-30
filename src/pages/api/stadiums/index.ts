import { Stadium } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';

type Data = {
  stadiums: Stadium[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const stadiums: Stadium[] = await prisma.stadium.findMany();
    return response.status(200).json({ stadiums });
  }
  return response.status(405);
};

export default handler;
