import Lottie from 'lottie-react';
import videoAnimation from '../../assets/lottie/videoLottie.json';

function VideoLottie(): JSX.Element {
  return (
    <div className="w-[40rem] h-[40rem]">
      <Lottie animationData={videoAnimation} loop={false} autoplay={true} />
    </div>
  );
}

export default VideoLottie;
