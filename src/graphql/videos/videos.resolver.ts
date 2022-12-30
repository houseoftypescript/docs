import { Video } from '../../@types/vleague';
import { getVideos } from './videos.service';

export const resolvers = {
  Query: {
    videos: async (_: unknown, maxResults: number): Promise<Video[]> => {
      return getVideos(maxResults);
    },
  },
};
