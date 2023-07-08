import React from 'react';
import capsuleLabel from '../../assets/images/capsule_label.png';
import styles from './styles.module.scss';

function MainOpenCapsule() {
  const capsules = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
    },
  ];

  return (
    <div className="flex flex-col items-center w-28">
      <div
        className={`${styles.capsule_box} flex z-10 items-center justify-center w-20 h-24 rounded-full bg-no-repeat bg-center`}
        style={{
          backgroundImage: `url(${capsules[0].img})`,
        }}
      ></div>
      <div className="relative z-30 w-20 -mt-4">
        <img src={capsuleLabel} className="w-20 " />
        <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
          {capsules[0].name}
        </div>
      </div>
    </div>
  );
}

export default MainOpenCapsule;
