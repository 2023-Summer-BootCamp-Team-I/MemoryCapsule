import React from 'react';
import capsuleLabel from '../../assets/images/capsule_label.png';

function Capsule() {
  const capsules = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
    },
  ];

  return (
    // <div className="static">
    //   <div className="w-20 h-24 bg-gray-200 rounded-full"></div>
    //   <img src={capsuleLabel} className="w-20 top-20" />
    // </div>
    <div className="flex flex-col items-center w-28">
      <div
        className=" w-20 h-24 rounded-full brightness-50 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${capsules[0].img})`,
          backgroundSize: 'cover',
          objectFit: 'cover',
          width: '5rem',
          height: '6rem',
          borderRadius: '50% / 50%',
        }}
      ></div>
      <div className="relative w-20 -mt-4">
        <img src={capsuleLabel} className="w-20 " />
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
          {capsules[0].name}
        </div>
      </div>
    </div>
  );
}

export default Capsule;
