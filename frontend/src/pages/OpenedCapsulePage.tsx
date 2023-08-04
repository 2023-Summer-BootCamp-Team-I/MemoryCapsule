import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KakaoShare from '../components/common/KakaoShare';

import OpenButton from '../components/OpenButton';
import PhotoLottie from '../components/PhotoLottie';
import VideoLottie from '../components/VideoLottie';
import { AxiosErrorResponseType, MyCapsuleListType } from '../utils/types';

function OpenedCapsulePage() {
  const { capsule_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [lottieType, setLottieType] = useState('');

  const [capsuleData, setCapsuleData] = useState<MyCapsuleListType>();

  const clickPhoto = () => {
    setIsLoading(true);
    setLottieType('photo');
    setTimeout(() => {
      document.location.href = `/opened/story/${capsule_id}`;
    }, 3000);
  };

  const clickVideo = () => {
    setIsLoading(true);
    setLottieType('video');
    setTimeout(() => {
      document.location.href = `/opened/video/${capsule_id}`;
    }, 2000);
  };

  const capsuleInfoAPI = async () => {
    try {
      await axios
        .get(`https://memorycapsule.co.kr/api/v1/capsules/${capsule_id}`)
        .then((response) => {
          setCapsuleData(response.data.capsule_data);
        });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        alert(axiosError.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    capsuleInfoAPI();
  }, []);

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
      {capsule_id && (
        <KakaoShare capsule_id={capsule_id} state={'opened'} capsuleData={capsuleData} />
      )}
    </div>
  );
}

export default OpenedCapsulePage;
