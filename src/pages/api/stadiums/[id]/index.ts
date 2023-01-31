import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method === 'GET') {
    const id = request.query.id as string;
    console.log(id);
    return response.status(200).json({ name: 'John Doe' });
  }
  return response.status(405);
}
