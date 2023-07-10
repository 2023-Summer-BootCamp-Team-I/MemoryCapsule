import { useEffect, useState } from 'react';
import openedCapsuleImg1 from '../../assets/images/openedCapsule_img1.png';
import openedCapsuleImg2 from '../../assets/images/openedCapsule_img2.png';

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
      className={`flex shadow-ButtonShadow items-center justify-center w-56 h-56 ${colorToShow} rounded-3xl`}
    >
      {imageToShow && <img src={imageToShow} className="w-32 h-32" />}
    </div>
  );
}
