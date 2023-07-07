import React from 'react';
import openedCapsuleImg1 from '../../assets/images/openedCapsule_img1.png';
import openedCapsuleImg2 from '../../assets/images/openedCapsule_img2.png';
const { useEffect, useState } = React;

type OpenButtonProps = {
  imageName: string;
};

function OpenButton({ imageName }: OpenButtonProps) {
  const [imageToShow, setImageToShow] = useState<string>('');
  const [colorToShow, setColorToShow] = useState<string>('');

  useEffect(() => {
    if (imageName === 'photo') {
      setImageToShow(openedCapsuleImg1);
      setColorToShow('[#FFD26D]');
    } else if (imageName === 'video') {
      setImageToShow(openedCapsuleImg2);
      setColorToShow('[#60C6CF]');
    }
  }, [imageName]);

  return (
    <div className={`flex items-center justify-center w-56 h-56 bg-${colorToShow} rounded-3xl`}>
      {imageToShow && <img src={imageToShow} className="w-32 h-32" />}
    </div>
  );
}

export default OpenButton;
