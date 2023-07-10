import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import blue_mark from '../../assets/images/bookmark/blue_mark.png';
import green_mark from '../../assets/images/bookmark/green_mark.png';
import pink_mark from '../../assets/images/bookmark/pink_mark.png';
import Bookmark from '../common/Bookmark';

interface RightBookmarkProps {
  activeBookmark: string;
  // eslint-disable-next-line no-unused-vars
  setActiveBookmark: (value: string) => void;
}

export default function RightBookmark({ activeBookmark, setActiveBookmark }: RightBookmarkProps) {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleBookmarkClick = (bookmarkColor: string) => {
    setActiveBookmark(bookmarkColor);

    switch (bookmarkColor) {
      case 'blue':
        navigate('/mainunopen');
        break;
      case 'green':
        navigate('/mainopened');
        break;
      case 'pink':
        navigate('/create');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (location.pathname === '/mainunopen') {
      setActiveBookmark('blue');
    } else if (location.pathname === '/mainopened') {
      setActiveBookmark('green');
    } else if (location.pathname === '/create') {
      setActiveBookmark('pink');
    }
  }, [location.pathname]);

  return (
    <>
      <Bookmark
        markImage={blue_mark}
        alt="Blue Mark"
        activeState={activeBookmark === 'blue'}
        setActiveState={() => handleBookmarkClick('blue')}
        text="미개봉"
        svgPath="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        top="8"
      />

      <Bookmark
        markImage={green_mark}
        alt="Green Mark"
        activeState={activeBookmark === 'green'}
        setActiveState={() => handleBookmarkClick('green')}
        text="개 봉"
        svgPath="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        top="14"
      />

      <Bookmark
        markImage={pink_mark}
        alt="Pink Mark"
        activeState={activeBookmark === 'pink'}
        setActiveState={() => handleBookmarkClick('pink')}
        text="Add "
        svgPath="M12 4.5v15m7.5-7.5h-15"
        top="44"
      />
    </>
  );
}
