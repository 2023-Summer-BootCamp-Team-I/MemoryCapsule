import Lottie from 'lottie-react';
import sendLodingLottie from '../../assets/lottie/sendLoadingLottie.json';

function SendLodingLottie(): JSX.Element {
  return (
    <div className="w-96 h-96">
      <Lottie animationData={sendLodingLottie} loop={false} autoplay={true} />
    </div>
  );
}

export default SendLodingLottie;
