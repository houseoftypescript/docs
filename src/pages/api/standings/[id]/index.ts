import { Standing } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prisma';

type Data = {
  standing: Standing;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    try {
      const id = request.query.id as string;
      const standing: Standing = await prisma.standing.findFirstOrThrow({
        where: { id },
      });
      return response.status(200).json({ standing });
    } catch (error) {
      console.error(error);
      return response.status(500);
    }
  }
  return response.status(405);
};

export default handler;
