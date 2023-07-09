import { useState } from 'react';
import TopBookmark from '../../common/TopBookmark';

function GalleryTopBookmark() {
  const [isOrangeActive, setIsOrangeActive] = useState(true);
  const [isPurpleActive, setIsPurpleActive] = useState(false);

  return (
    <div className="fixed top-6 left-36">
      <div className="flex gap-4">
        <TopBookmark
          title="내가 만든 캡슐"
          color="#FF842E"
          activeState={isOrangeActive}
          setActiveState={setIsOrangeActive}
          setInactiveState={setIsPurpleActive}
        />
        <TopBookmark
          title="내가 참여한 캡슐"
          color="#9B8DF8"
          activeState={isPurpleActive}
          setActiveState={setIsPurpleActive}
          setInactiveState={setIsOrangeActive}
        />
      </div>
    </div>
  );
}

export default GalleryTopBookmark;
