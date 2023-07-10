import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightBookmark from '../RightBookmark';
import GalleryTopBookmark from '../CapsuleGallery/GalleryTopBookmark';

type ChildrenProps = {
  children: React.ReactNode;
};

function Background({ children }: ChildrenProps) {
  const location = useLocation();

  const isMain =
    location.pathname === '/mainunopened' ||
    location.pathname === '/mainopened' ||
    location.pathname === '/create';
  const isGallery = location.pathname === '/mygallery' || location.pathname === '/joingallery';

  const [activeBookmark, setActiveBookmark] = useState('blue');
  const [activeRightBookmark, setActiveRightBookmark] = useState('orange');

  return (
    <div className="relative z-0 flex items-center justify-center w-full h-screen overflow-hidden">
      <div className="absolute left-[53%] transform -translate-x-1/2 h-[47rem] w-[80rem] bg-[#B1CFEC] rounded-[1.875rem] flex justify-center items-center z-10 shadow-lg" />

      {isMain && (
        <RightBookmark activeBookmark={activeBookmark} setActiveBookmark={setActiveBookmark} />
      )}
      {isGallery && (
        <GalleryTopBookmark
          activeBookmark={activeRightBookmark}
          setActiveBookmark={setActiveRightBookmark}
        />
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 h-[47rem] w-[80rem] bg-white rounded-[1.875rem] flex justify-center items-center z-30 shadow-lg" />

      <div className="relative z-40">{children}</div>
    </div>
  );
}

export default Background;
