import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightBookmark from '../RightBookmark';
import Header from './Header';

type ChildrenProps = {
  children: React.ReactNode;
};

function Background({ children }: ChildrenProps) {
  const location = useLocation();

  const isMain =
    location.pathname === '/mainunopen' ||
    location.pathname === '/mainopened' ||
    location.pathname === '/create';
  const isGallery =
    location.pathname.startsWith('/mygallery') || location.pathname.startsWith('/joingallery');

  const [activeBookmark, setActiveBookmark] = useState('blue');

  return (
    <div className="relative z-0 flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="absolute left-[53%] transform -translate-x-1/2 h-[47rem] w-[80rem] bg-[#B1CFEC] rounded-[1.875rem] flex justify-center items-center z-10 shadow-lg" />

      {isMain && (
        <RightBookmark activeBookmark={activeBookmark} setActiveBookmark={setActiveBookmark} />
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 h-[47rem] w-[80rem] bg-white rounded-[1.875rem] flex justify-center items-center z-30 shadow-lg" />

      {location.pathname !== '/' && (
        <div className="absolute top-[4rem] z-40 right-[9rem]">
          <Header />
        </div>
      )}

      <div className="absolute left-[8rem] z-40 top-[6rem]">
        {(isMain || isGallery) && <div className="text-5xl font-bold font-Omu">Memory Capsule</div>}
      </div>

      <div className="relative z-40">{children}</div>
    </div>
  );
}

export default Background;
