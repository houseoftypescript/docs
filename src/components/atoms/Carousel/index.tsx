import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import React, { useState } from 'react';
import { CDN_IMAGE_URL } from '../../../constants';

export const Carousel: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom: '50%' }}
    >
      {[3, 2, 1].map((intro, index) => {
        const backgroundImage = `url(${CDN_IMAGE_URL}/intros/intro-${intro}.png)`;
        const zIndex = Math.abs((index + count) % 3) * 10;
        return (
          <div
            key={`intro-${intro}`}
            className={`absolute w-full h-full bg-cover bg-center transition-all top-0 left-0`}
            style={{ zIndex, backgroundImage }}
          >
            <div className="w-full h-full bg-gray-100/20" />
          </div>
        );
      })}
      <div
        className="z-40 absolute left-0 top-0 bottom-0 m-auto w-8 h-16 bg-gray-900/50 hover:bg-gray-900/75 cursor-pointer text-white flex items-center justify-center"
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        <ChevronLeft className="text-3xl" />
      </div>
      <div
        className="z-40 absolute right-0 top-0 bottom-0 m-auto w-8 h-16 bg-gray-900/50 hover:bg-gray-900/75 cursor-pointer text-white flex items-center justify-center"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        <ChevronRight className="text-3xl" />
      </div>
    </div>
  );
};

Carousel.displayName = 'Carousel';
Carousel.defaultProps = {};

export default Carousel;
