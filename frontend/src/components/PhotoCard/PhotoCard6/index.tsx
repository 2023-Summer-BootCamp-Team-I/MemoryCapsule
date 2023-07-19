import React, { useState } from 'react';

interface StoryType {
  img: string;
  owner: string;
  title: string;
  content: string;
}

interface PhotoCardProps {
  data: StoryType;
}

function PhotoCard2({ data }: PhotoCardProps) {
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
    <div className="flex flex-col justify-end w-full h-full relative right-5 ">
      <div className="z-20 relative">
        <div
          className={cardStyles}
          style={{
            transform: 'rotate(8deg)',
          }}
          onClick={handleClick}
        >
          <div className={circleStyles}></div>
          <div className={imageStyles} style={{ backgroundImage: `url(${data.img})` }}></div>
          <div className={textStyles}>{data.title}da</div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard2;
