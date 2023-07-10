import React from 'react';
import capsuleLabel from '../../assets/images/capsule_label.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function MainUnOpenCapsule() {
  const capsules = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
      num: '3',
      day: '2023.11.21',
    },
  ];

  return (
    <div className="flex flex-col items-center w-36 text-xs">
      <div
        className="flex items-center justify-center w-20 h-24 rounded-full relative"
        style={{
          width: '8rem',
          height: '10rem',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <div
          className="
          bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${capsules[0].img})`,
            backgroundSize: 'cover',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            filter: 'brightness(50%)',
          }}
        ></div>
        <div
          className="text-white absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: '1' }}
        >
          <div className="flex ">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex pl-1">{capsules[0].num}</div>
          </div>
          <FontAwesomeIcon className="pt-1 pb-3" size="2x" icon={faLock} />
          <div>개봉일: {capsules[0].day}</div>
        </div>
      </div>
      <div className="relative  w-28 -mt-5">
        <img src={capsuleLabel} />
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
          {capsules[0].name}
        </div>
      </div>
    </div>
  );
}

export default MainUnOpenCapsule;
