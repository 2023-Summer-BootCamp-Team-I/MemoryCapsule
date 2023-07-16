import { useEffect, useState } from 'react';
import openedCapsuleImg1 from '../../assets/images/openedCapsule/openedCapsule_img1.png';
import openedCapsuleImg2 from '../../assets/images/openedCapsule/openedCapsule_img2.png';

type OpenButtonProps = {
  imageName: string;
};

function OpenButton({ imageName }: OpenButtonProps) {
  const [imageToShow, setImageToShow] = useState('');
  const [colorToShow, setColorToShow] = useState('');
  const [textToShow, setTextToShow] = useState('');

  useEffect(() => {
    if (imageName === 'photo') {
      setImageToShow(openedCapsuleImg1);
      setColorToShow('bg-[#FFD26D]');
      setTextToShow('< 사진 보러 가기 >');
    } else if (imageName === 'video') {
      setImageToShow(openedCapsuleImg2);
      setColorToShow('bg-[#60C6CF]');
      setTextToShow('< 동영상 보러 가기 >');
    }
  }, [imageName, imageToShow]);

  return (
    <div
      className={`flex flex-col shadow-ButtonShadow items-center justify-center h-[18rem] w-[19rem] ${colorToShow} rounded-3xl cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out active:scale-95`}
    >
      {imageToShow && <img src={imageToShow} className="w-32 h-32" />}
      <div className="mt-3 font-Omu">
        <span>{textToShow}</span>
      </div>
    </div>
  );
}

export default OpenButton;
