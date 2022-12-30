import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../libs/prisma';
import { Position, PositionId } from '@prisma/client';

type Data = {
  position: Position;
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    try {
      const id = request.query.id as PositionId;
      const position: Position = await prisma.position.findFirstOrThrow({
        where: { id },
      });
      return response.status(200).json({ position });
    } catch (error) {
      console.error(error);
      return response.status(500);
    }
  }
  return response.status(405);
};

export default handler;
