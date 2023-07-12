import React from 'react';
import CreateCapsuleNote from '../components/CreateCapsuleNote';
import CreateTheme from '../components/CreateTheme/indext';

export default function CreateCapsulePage() {
  return (
    <div className="flex items-center justify-center h-[42rem] w-[75rem] font-Omu">
      <div className="flex items-center justify-between w-full p-16">
        <div className="flex flex-col">
          <div className="text-5xl">ㅌ ㅔ ㅁ ㅏ</div>
          <CreateTheme />
        </div>
        <div>
          <CreateCapsuleNote />
        </div>
      </div>
    </div>
  );
}
