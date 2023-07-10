import capsuleLabel from '../../../assets/images/capsule_label.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function UnopenCapsule() {
  const capsules = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
      num: '3',
      day: '2023.11.21',
    },
  ];

  return (
    <div className=" flex flex-col items-center text-xs w-36 mt-[1rem] ml-[1rem]">
      <div
        className="relative flex items-center justify-center w-20 h-24 rounded-full shadow-ButtonShadow"
        style={{
          width: '10.5rem',
          height: '12.5rem',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <div
          className="bg-center bg-no-repeat "
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
          className="absolute inset-0 flex flex-col items-center justify-center text-white"
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
      <div className="relative -mt-4 w-28">
        <img src={capsuleLabel} />
        <div className="absolute text-xl font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {capsules[0].name}
        </div>
      </div>
    </div>
  );
}

export default UnopenCapsule;
