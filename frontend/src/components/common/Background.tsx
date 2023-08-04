import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightBookmark from '../RightBookmark';
import Header from './Header';

import { useRecoilValue } from 'recoil';
import { loggedInState } from '../../utils/Recoil';

type ChildrenProps = {
  children: React.ReactNode;
};

function Background({ children }: ChildrenProps) {
  const location = useLocation();
  const loggedIn = useRecoilValue(loggedInState);

  const isMain =
    location.pathname === '/mainunopened' ||
    location.pathname === '/mainopened' ||
    location.pathname === '/create';
  const isGallery =
    location.pathname.startsWith('/mygallery') || location.pathname.startsWith('/joingallery');

  const [activeBookmark, setActiveBookmark] = useState('blue');

  return (
    <div className="z-0 flex items-center justify-center w-full h-screen overflow-hidden ">
      <div className="relative h-[47rem] w-[85rem] bg-[#B1CFEC] rounded-[1.875rem] flex justify-center items-center z-0 shadow-lg">
        {isMain && (
          <RightBookmark activeBookmark={activeBookmark} setActiveBookmark={setActiveBookmark} />
        )}
        <div className="absolute left-[0rem] h-[47rem] w-[80rem] bg-white rounded-[1.875rem] flex justify-center items-center z-40 shadow-lg">
          <div className="absolute left-[3rem] bottom-[42rem] z-30">
            {(isMain || isGallery) && (
              <div className="text-5xl font-bold font-Omu">Memory Capsule</div>
            )}
          </div>
          {location.pathname !== '/' && loggedIn === true && (
            <div className="absolute top-[0.5rem] z-40 right-[7rem]">
              <Header />
            </div>
          )}
          <div className="relative z-40">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Background;
