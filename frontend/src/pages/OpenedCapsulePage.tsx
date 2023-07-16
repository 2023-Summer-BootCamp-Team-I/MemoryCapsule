import { useState } from 'react';
import { useParams } from 'react-router-dom';
import KakaoShare from '../components/common/KakaoShare';

import OpenButton from '../components/OpenButton';
import PhotoLottie from '../components/PhotoLottie';
import VideoLottie from '../components/VideoLottie';

function OpenedCapsulePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lottieType, setLottieType] = useState('');

  const clickPhoto = () => {
    setIsLoading(true);
    setLottieType('photo');
    setTimeout(() => {
      document.location.href = '/story';
    }, 3000);
  };

  const clickVideo = () => {
    setIsLoading(true);
    setLottieType('video');
    setTimeout(() => {
      document.location.href = '/video';
    }, 3000);
  };

  const { capsule_id } = useParams();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-around relative h-[42rem] w-[50rem]">
        <button onClick={clickPhoto}>
          <OpenButton imageName="photo" />
        </button>
        <button onClick={clickVideo}>
          <OpenButton imageName="video" />
        </button>
      </div>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white">
          {lottieType === 'photo' ? <PhotoLottie /> : <VideoLottie />}
        </div>
      )}
      {/* capsule_id: {capsule_id} <br />
      OpenedCapsulePage */}
      {capsule_id && <KakaoShare capsule_id={capsule_id} state={'opened'} />}
    </div>
  );
}

export default OpenedCapsulePage;
