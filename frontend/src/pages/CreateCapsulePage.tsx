/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import CreateCapsuleNote from '../components/CreateCapsuleNote';
import CreateTheme from '../components/CreateTheme';

import SendLodingLottie from '../components/SendLodindLottie';

function CreateCapsulePage() {
  const [themeName, setThemeName] = useState<string>('심심하다옹');
  const [themeId, setThemeId] = useState<number>(0);
  const [showLottie, setShowLottie] = useState(false);

  const handleGetName = (data: string) => {
    setThemeName(data);
  };
  const handleGetId = (data: number) => {
    setThemeId(data);
  };

  useEffect(() => {
    console.log('Current themeId:', themeId);
  }, [themeId]);

  const handleApiSuccess = () => {
    setShowLottie(true);
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
            themeName={themeName}
            themeId={themeId}
            onApiSuccess={handleApiSuccess}
          />
        </div>
      </div>
      {showLottie && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-white">
          <SendLodingLottie />
        </div>
      )}
    </div>
  );
}

export default CreateCapsulePage;
