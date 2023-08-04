import { useState, useEffect } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import SendAnimation from '../../assets/lottie/sendLottie.json';

function SendLottie() {
  const [animation, setAnimation] = useState<AnimationItem | null>(null);

  useEffect(() => {
    const container = document.getElementById('lottieContainer');
    if (!container) return;

    const anim = lottie.loadAnimation({
      container,
      animationData: SendAnimation,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });

    setAnimation(anim);

    return () => {
      anim.destroy();
    };
  }, []);

  const handleMouseEnter = () => {
    if (animation) {
      animation.goToAndPlay(0);
    }
  };

  const handleMouseLeave = () => {
    if (animation) {
      animation.goToAndStop(0);
    }
  };

  return (
    <div
      className="mt-2 -ml-4 cursor-pointer w-28 h-28"
      id="lottieContainer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
}

export default SendLottie;
