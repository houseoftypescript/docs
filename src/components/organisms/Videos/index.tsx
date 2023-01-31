import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Video } from '../../../@types/vleague';

export type VideosProps = { videos: Video[] };

const Videos: React.FC<VideosProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {videos.map((video) => {
        const url = `https://youtu.be/${video.id}`;
        return (
          <div key={`video-${video.id}`}>
            <a href={url} target="_blank" rel="noreferrer">
              <div
                className="relative bg-cover bg-center mb-4 rounded bg-gray-300 overflow-hidden shadow-2xl"
                style={{
                  paddingBottom: '50%',
                  backgroundImage: `url(${video.thumbnail})`,
                }}
              >
                <div className="absolute w-full h-full bg-gray-900/50 hover:bg-gray-900/25 transition-all">
                  <div className="w-full h-full flex items-center justify-center">
                    <PlayArrowIcon className="text-white text-6xl" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl">{video.title}</h3>
            </a>
          </div>
        );
      })}
    </div>
  );
};

Videos.displayName = 'Videos';

export default Videos;
