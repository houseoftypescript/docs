import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prisma';
import { Competition } from '@prisma/client';

type Data = {
  competition: Competition;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    try {
      const id = request.query.id as string;
      const competition: Competition =
        await prisma.competition.findFirstOrThrow({
          where: { id },
        });
      return response.status(200).json({ competition });
    } catch (error) {
      console.error(error);
      return response.status(500);
    }
  }
  return response.status(405);
};

export default handler;
