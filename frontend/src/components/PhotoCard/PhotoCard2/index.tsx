import React, { useState } from 'react';

import star1 from '../../../assets/images/PhotoTheme/star1.png';

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

  const textStyles = `w-full p-10 flex flex-col  absolute top-0 left-0 ${
    isClicked ? 'visible' : 'invisible'
  }`;

  return (
    <div className="flex flex-col justify-end w-full h-full relative right-5 ">
      <div className="z-20 relative">
        <img
          src={star1}
          alt="Leaf"
          className="z-20 absolute top-[17rem] left-[12rem]  h-[7em] w-[5rem] "
          style={{ transform: 'rotate(-15deg)' }}
        />
        <div
          className={cardStyles}
          style={{
            transform: 'rotate(15deg)',
          }}
          onClick={handleClick}
        >
          <div className={circleStyles}></div>
          <div className={imageStyles} style={{ backgroundImage: `url(${data.img})` }}></div>
          <div className={textStyles}>
            <div className="border-b pb-4">{data.title}</div>
            <div className=" pt-4">{data.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard2;
