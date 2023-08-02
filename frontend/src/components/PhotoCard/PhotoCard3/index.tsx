import { useState } from 'react';
import heart from '../../../assets/images/PhotoTheme/heart.png';

interface StoryType {
  img: string;
  owner: string;
  title: string;
  content: string;
}

interface PhotoCardProps {
  data: StoryType;
}

function PhotoCard3({ data }: PhotoCardProps) {
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
    <div className="flex flex-col justify-start w-full h-full right-5">
      <div className="relative ">
        {/* opacity-50 */}
        <img
          src={heart}
          alt="Leaf"
          className="z-20 absolute bottom-[14rem] left-[15rem]  h-[9em] w-[7rem]"
          style={{ transform: 'rotate(-10deg)' }}
        />
        <div
          className={cardStyles}
          style={{
            transform: 'rotate(7deg)',
          }}
          onClick={handleClick}
        >
          <div className={circleStyles}></div>
          <div className={imageStyles} style={{ backgroundImage: `url(${data.img})` }}></div>
          <div className={textStyles}>
            <div className="pb-4 text-xl border-b">{data.title}</div>
            <div className="pt-4 text-lg ">{data.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard3;
