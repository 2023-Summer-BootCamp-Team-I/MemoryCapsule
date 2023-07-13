import { useEffect, useState } from 'react';
import openedCapsuleImg1 from '../../assets/images/openedCapsule/openedCapsule_img1.png';
import openedCapsuleImg2 from '../../assets/images/openedCapsule/openedCapsule_img2.png';

type OpenButtonProps = {
  imageName: string;
};

export default function OpenButton({ imageName }: OpenButtonProps) {
  const [imageToShow, setImageToShow] = useState('');
  const [colorToShow, setColorToShow] = useState('');

  useEffect(() => {
    if (imageName === 'photo') {
      setImageToShow(openedCapsuleImg1);
      setColorToShow('bg-[#FFD26D]');
    } else if (imageName === 'video') {
      setImageToShow(openedCapsuleImg2);
      setColorToShow('bg-[#60C6CF]');
    }
  }, [imageName, imageToShow]);

  return (
    <div
      className={`flex shadow-ButtonShadow items-center justify-center h-[18rem] w-[19rem] ${colorToShow} rounded-3xl cursor-pointer`}
    >
      {imageToShow && <img src={imageToShow} className="w-32 h-32" />}
    </div>
  );
}
