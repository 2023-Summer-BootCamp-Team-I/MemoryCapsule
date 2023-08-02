import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

function StepTwo() {
  // const [isLoading, setIsLoading] = useState(true);

  const LoadingLottie = () => {
    const getAnimationData = async () => {
      const data = await import('../../../../assets/lottie/makevideo.json');
      return data.default;
    };

    //lottie
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
      (async () => {
        const animationData = await getAnimationData();
        const animation = lottie.loadAnimation({
          container: element.current as HTMLDivElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
        });

        return () => {
          animation.destroy(); // lottie-web 인스턴스 제거
        };
      })();
    }, []);

    return <div ref={element} style={{ width: '250px', height: 300 }}></div>;
  };

  return (
    <div className="flex items-center justify-center">
      <LoadingLottie />
    </div>
  );
}

export default StepTwo;
