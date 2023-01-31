import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../libs/prisma';
import { Position } from '@prisma/client';

type Data = {
  positions: Position[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const positions: Position[] = await prisma.position.findMany();
    return response.status(200).json({ positions });
  }
  return response.status(405);
};

export default handler;
