import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../@types/vleague';

type Data = {
  videos: Video[];
};

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (request.method === 'GET') {
    const videos: Video[] = [];
    return response.status(200).json({ videos });
  }
  return response.status(405);
};

export default handler;
