import { useState, useEffect } from 'react';
import RightBookmark from '../RightBookmark';

type ChildrenProps = {
  children: React.ReactNode;
};

export default function Background({ children }: ChildrenProps) {
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    if (
      window.location.href === 'http://localhost:5173/mainunopened' ||
      window.location.href === 'http://localhost:5173/mainopened'
    ) {
      setIsMain(true);
    }
  }, []);

  return (
    <div className="relative z-0 flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="absolute left-[53%] transform -translate-x-1/2 h-[47rem] w-[80rem] bg-[#B1CFEC] rounded-[1.875rem] flex justify-center items-center z-10 shadow-lg" />

      {isMain && <RightBookmark />}

      <div className="absolute left-1/2 transform -translate-x-1/2 h-[47rem] w-[80rem] bg-white rounded-[1.875rem] flex justify-center items-center z-30 shadow-lg" />

      <div className="relative z-40">{children}</div>
    </div>
  );
}
