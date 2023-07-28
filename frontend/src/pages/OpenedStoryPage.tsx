/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import MuseumTheme from '../components/Themes/MuseumTheme';
import PhotoTheme from '../components/Themes/PhotoTheme';
import { StoryListType } from '../utils/types';

const OpenedStoryPage = () => {
  const { capsule_id } = useParams();
  const navigate = useNavigate();
  const [openStory, setOpenStory] = useState<StoryListType[]>([]);

  const openStoryAPI = async () => {
    try {
      await axios.get(`/api/v1/stories/${capsule_id}`).then((response) => {
        console.log('response: ', response);
        console.log(response.data.story_list);
        setOpenStory(response.data.story_list);
      });
    } catch (error) {
      console.log('api 불러오기 실패');
      console.log(error);
    }
  };

  useEffect(() => {
    openStoryAPI();
  }, []);

  return (
    <div>
      <div
        className="fixed top-[4rem] cursor-pointer left-[8rem]"
        onClick={() => navigate(`/opened/${capsule_id}`)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </div>
      <PhotoTheme openStory={openStory} />
      {/* <MuseumTheme openStory={openStory}/> */}
    </div>
  );
};

export default OpenedStoryPage;
