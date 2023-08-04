import capsuleLabel from '../../../assets/images/stickers/pink2.png';
import { MyCapsuleListType } from '../../../utils/types';

interface OpenCapsuleProps {
  capsule: MyCapsuleListType;
}

function OpenCapsule({ capsule }: OpenCapsuleProps) {
  return (
    <div className="flex flex-col items-center w-36 mt-[1rem] ml-[1rem]">
      <div
        className="flex items-center justify-center w-20 h-24 bg-center bg-no-repeat rounded-full shadow-ButtonShadow"
        style={{
          backgroundImage: `url(${capsule.capsule_img_url})`,
          backgroundSize: 'cover',
          objectFit: 'cover',
          width: '10.5rem',
          height: '12.5rem',
          borderRadius: '50% / 50%',
        }}
      ></div>
      <div className="relative w-32 -mt-4">
        <img src={capsuleLabel} className="h-12" />
        <div className="absolute text-xl font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-36">
          {capsule.capsule_name}
        </div>
      </div>
    </div>
  );
}

export default OpenCapsule;
