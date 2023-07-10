import capsuleLabel from '../../../assets/images/capsule_label.png';

function OpenCapsule() {
  const capsules = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
    },
  ];

  return (
    <div className="flex flex-col items-center w-36 mt-[1rem] ml-[1rem]">
      <div
        className="flex items-center justify-center w-20 h-24 bg-center bg-no-repeat rounded-full shadow-ButtonShadow"
        style={{
          backgroundImage: `url(${capsules[0].img})`,
          backgroundSize: 'cover',
          objectFit: 'cover',
          width: '10.5rem',
          height: '12.5rem',
          borderRadius: '50% / 50%',
        }}
      ></div>
      <div className="relative -mt-4 w-28">
        <img src={capsuleLabel} />
        <div className="absolute text-xl font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {capsules[0].name}
        </div>
      </div>
    </div>
  );
}

export default OpenCapsule;
