import React, { useState, useEffect } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import SendAnimation from '../../assets/lottie/SendLottie.json';

const SendLottie: React.FC = () => {
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
      className="w-32 h-32 cursor-pointer -ml-4 "
      id="lottieContainer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default SendLottie;

// -mt-10 -ml-4
