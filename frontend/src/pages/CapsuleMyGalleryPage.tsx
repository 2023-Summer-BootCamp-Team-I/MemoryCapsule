import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GalleryTopBookmark from '../components/CapsuleGallery/GalleryTopBookmark';

function CapsuleMyGalleryPage() {
  const { is_open } = useParams();
  const [activeTopBookmark, setActiveTopBookmark] = useState('orange');

  return (
    <div className="relative h-[42rem] w-[75rem]">
      <div className="absolute top-0 -mt-[4.5rem]">
        {is_open !== undefined && (
          <GalleryTopBookmark
            activeBookmark={activeTopBookmark}
            setActiveBookmark={setActiveTopBookmark}
            is_open={is_open}
          />
        )}
      </div>
      CapsuleMyGalleryPage
      <br />
      is_open: {is_open}
    </div>
  );
}

export default CapsuleMyGalleryPage;
