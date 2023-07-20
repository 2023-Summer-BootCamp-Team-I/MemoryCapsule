import { useState } from 'react';
import CreateCapsuleNote from '../components/CreateCapsuleNote';
import CreateTheme from '../components/CreateTheme/indext';
import SendLodingLottie from '../components/SendLodindLottie';

function CreateCapsulePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      history.back();
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center h-[42rem] w-[75rem] font-Omu">
      <div className="flex items-center justify-between w-full p-16">
        <div className="flex flex-col">
          <div className="text-5xl">ㅌ ㅔ ㅁ ㅏ</div>
          <CreateTheme />
        </div>
        <div>
          <CreateCapsuleNote onButtonClick={handleButtonClick} />
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white">
          <SendLodingLottie />
        </div>
      )}
    </div>
  );
}

export default CreateCapsulePage;
