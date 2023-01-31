import axios from 'axios';
import { Video } from '../../@types/vleague';
import { API } from '../../environments';

export const getVideos = async (maxResults: number): Promise<Video[]> => {
  const { data } = await axios.get<{ videos: Video[] }>(
    `${API}/videos?maxResults=${maxResults}`
  );
  return data.videos || [];
};
