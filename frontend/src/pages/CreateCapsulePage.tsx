/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import CreateCapsuleNote from '../components/CreateCapsuleNote';
import CreateTheme from '../components/CreateTheme/indext';

import SendLodingLottie from '../components/SendLodindLottie';

function CreateCapsulePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [themeName, setThemeName] = useState<string>('심심하다옹');
  const [themeId, setThemeId] = useState<number>(0);

  const handleGetName = (data: string) => {
    setThemeName(data);
    // eslint-disable-next-line no-console
    console.log('handleGetName: ', data);
  };
  const handleGetId = (data: number) => {
    setThemeId(data);
    // eslint-disable-next-line no-console
    console.log('handleGetId: ', data);
  };

  useEffect(() => {
    console.log('Current themeId:', themeId);
  }, [themeId]);

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
          <CreateTheme sendName={handleGetName} sendId={handleGetId} />
        </div>
        <div>
          <CreateCapsuleNote
            onButtonClick={handleButtonClick}
            themeName={themeName}
            themeId={themeId}
          />
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
