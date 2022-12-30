import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  response: NextApiResponse<Data>
) {
  response.status(200).json({ status: 'healthy' });
}
