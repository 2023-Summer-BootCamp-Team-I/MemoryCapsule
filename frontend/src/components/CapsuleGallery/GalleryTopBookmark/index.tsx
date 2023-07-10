import { useNavigate } from 'react-router-dom';
import TopBookmark from '../../common/TopBookmark';

interface TopBookmarkProps {
  activeBookmark: string;
  // eslint-disable-next-line no-unused-vars
  setActiveBookmark: (value: string) => void;
}

function GalleryTopBookmark({ activeBookmark, setActiveBookmark }: TopBookmarkProps) {
  const navigate = useNavigate();

  const handleBookmarkClick = (bookmarkColor: string) => {
    setActiveBookmark(bookmarkColor);

    switch (bookmarkColor) {
      case 'orange':
        navigate('/mygallery');
        break;
      case 'purple':
        navigate('/joingallery');
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed z-50 top-4 left-36">
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
