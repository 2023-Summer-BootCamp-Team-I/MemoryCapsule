import React, { useState } from 'react';
import { StoryListType } from '../../../utils/types';

import star1 from '../../../assets/images/PhotoTheme/star1.png';

interface PhotoCardProps {
  data: StoryListType;
  // eslint-disable-next-line no-unused-vars
  wrapTextEveryNCharacters: (str: string, n: number) => string;
}

function PhotoCard2({ data, wrapTextEveryNCharacters }: PhotoCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const cardStyles =
    'z-10 relative flex justify-center items-center h-[22rem] w-[17rem] bg-white cursor-pointer  border border-MyBlue';

  const circleStyles =
    'absolute top-1 right-1/2 transform translate-x-1/2 -translate-y-1/2 h-[2.5rem] w-[2.5rem] bg-[#F0F1F3] rounded-full shadow-ButtonShadow ';

  const imageStyles = `h-[20.5rem] w-[15.5rem] bg-gray-300 bg-center bg-no-repeat bg-cover cursor-pointer ${
    isClicked ? 'hidden' : ''
  }`;

  const textStyles = `w-full p-10 flex flex-col  absolute top-0 left-0 ${
    isClicked ? 'visible' : 'invisible'
  }`;

  return (
    <div className="relative flex flex-col justify-end w-full h-full right-5 ">
      <div className="relative z-20">
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
          <div className={imageStyles} style={{ backgroundImage: `url(${data.story_url})` }}></div>
          <div className={textStyles}>
            <div className="pb-4 text-xl border-b">{data.story_title}</div>
            <div className="pt-4 text-lg whitespace-pre-line">
              {wrapTextEveryNCharacters(data.story_content, 23)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard2;
