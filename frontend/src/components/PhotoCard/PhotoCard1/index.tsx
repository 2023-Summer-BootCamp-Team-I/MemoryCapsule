import React, { useState } from 'react';

import line1 from '../../../assets/images/PhotoTheme/line1.png';

interface StoryType {
  img: string;
  owner: string;
  title: string;
  content: string;
}

interface PhotoCardProps {
  data: StoryType;
}

function PhotoCard1({ data }: PhotoCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const cardStyles =
    'z-10 relative flex justify-center items-center h-[22rem] w-[17rem] bg-white cursor-pointer';

  const circleStyles =
    'absolute top-1 right-1/2 transform translate-x-1/2 -translate-y-1/2 h-[3rem] w-[3rem] bg-[#efece3] rounded-full shadow-ButtonShadow ';

  const imageStyles = `h-[20.5rem] w-[15.5rem] bg-gray-300 bg-center bg-no-repeat bg-cover cursor-pointer ${
    isClicked ? 'hidden' : ''
  }`;

  const textStyles = `absolute top-5 left-5 ${isClicked ? 'visible' : 'invisible'}`;

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="relative">
        <img
          src={line1}
          alt="Leaf"
          className="z-0 absolute bottom-[18rem] right-[18rem]  h-[5em] w-[3rem] "
          style={{ transform: 'rotate(10deg)' }}
        />

        <div
          className={cardStyles}
          style={{
            transform: 'rotate(-10deg)',
          }}
          onClick={handleClick}
        >
          <div className={circleStyles}></div>
          <div className={imageStyles} style={{ backgroundImage: `url(${data.img})` }}></div>
          <div className={textStyles}>{data.title}</div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard1;
