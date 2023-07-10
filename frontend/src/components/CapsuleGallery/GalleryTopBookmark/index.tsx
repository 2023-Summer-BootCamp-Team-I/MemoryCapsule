import { useNavigate } from 'react-router-dom';
import TopBookmark from '../../common/TopBookmark';

interface TopBookmarkProps {
  activeBookmark: string;
  // eslint-disable-next-line no-unused-vars
  setActiveBookmark: (value: string) => void;
  is_open: string;
}

function GalleryTopBookmark({ activeBookmark, setActiveBookmark, is_open }: TopBookmarkProps) {
  const navigate = useNavigate();

  const handleBookmarkClick = (bookmarkColor: string) => {
    setActiveBookmark(bookmarkColor);

    switch (bookmarkColor) {
      case 'orange':
        navigate(`/mygallery/${is_open}`);
        break;
      case 'purple':
        navigate(`/joingallery/${is_open}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="z-50 ">
      <div className="flex gap-4">
        <TopBookmark
          title="내가 만든 캡슐"
          color="#FF842E"
          activeState={activeBookmark === 'orange'}
          setActiveState={() => handleBookmarkClick('orange')}
        />
        <TopBookmark
          title="내가 참여한 캡슐"
          color="#9B8DF8"
          activeState={activeBookmark === 'purple'}
          setActiveState={() => handleBookmarkClick('purple')}
        />
      </div>
    </div>
  );
}

export default GalleryTopBookmark;
