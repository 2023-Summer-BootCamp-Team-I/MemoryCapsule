import capsuleLabel from '../../../assets/images/stickers/pink2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { MyCapsuleListType } from '../../../utils/types';
interface OpenCapsuleProps {
  capsule: MyCapsuleListType;
}

function UnopenCapsule({ capsule }: OpenCapsuleProps) {
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
            backgroundImage: `url(${capsule.capsule_img_url})`,
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
          {/* <div className="flex ">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex pl-1">{capsule.num}]</div>
          </div> */}
          <FontAwesomeIcon className="pt-1 pb-3" size="2x" icon={faLock} />
          <div>개봉일: {capsule.due_date.slice(0, 10)}</div>
        </div>
      </div>
      <div className="relative w-32 -mt-4">
        <img src={capsuleLabel} className="h-12" />
        <div className="absolute text-xl font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-36">
          {capsule.capsule_name}
        </div>
      </div>
    </div>
  );
}

export default UnopenCapsule;
