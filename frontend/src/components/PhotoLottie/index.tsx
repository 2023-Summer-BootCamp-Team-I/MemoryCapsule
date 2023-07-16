import React from 'react';
import Lottie from 'lottie-react';
import photoAnimation from '../../assets/lottie/photoLottie.json';

function PhotoLottie(): JSX.Element {
  return (
    <div className="w-[30rem] h-[30rem] mt-40">
      <Lottie animationData={photoAnimation} loop={false} autoplay={true} />
    </div>
  );
}

export default PhotoLottie;
