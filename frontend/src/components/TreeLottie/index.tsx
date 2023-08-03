import Lottie from 'lottie-react';
import treeAnimation from '../../assets/lottie/treeLottie.json';

function TreeLottie(): JSX.Element {
  return (
    <div className="w-96 h-96">
      <Lottie animationData={treeAnimation} loop={false} autoplay={true} />
    </div>
  );
}

export default TreeLottie;
