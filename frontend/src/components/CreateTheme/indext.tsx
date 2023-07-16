import React, { useState } from 'react';

const CreateTheme: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://img.freepik.com/free-photo/close-up-portrait-on-beautiful-cat_23-2149214373.jpg',
    'https://photo.coolenjoy.co.kr/data/editor/1608/thumb-Bimg_20160830182658_rnuhpunc.jpg',
    'https://png.pngtree.com/background/20230516/original/pngtree-tabby-cat-on-the-ground-with-green-eyes-picture-image_2605523.jpg',
    // Add more image URLs here
  ];

  const themeNames = ['심심하다옹', '졸리다옹', '널 먹겠다옹']; // Add more theme names if needed

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div className="py-3 text-2xl">{themeNames[activeIndex]}</div>
      <div className="h-[25rem] w-[35rem] relative">
        <div className="absolute flex transform -translate-x-1/2 bottom-4 left-1/2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full mx-1 cursor-pointer ${
                activeIndex === index ? 'bg-black' : 'bg-gray-200'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <div
          className="absolute left-0 p-4 m-2 text-white transform -translate-y-1/2 bg-black rounded-full cursor-pointer w-15 h-15 top-1/2 bg-opacity-10 hover:bg-opacity-50"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div
          className="absolute right-0 p-4 m-2 text-white transform -translate-y-1/2 bg-black rounded-full cursor-pointer w-15 h-15 top-1/2 bg-opacity-10 hover:bg-opacity-50"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        <img
          className="object-cover w-full h-full"
          src={images[activeIndex]}
          alt={`Carousel Image ${activeIndex}`}
        />
      </div>
    </div>
  );
};

export default CreateTheme;
