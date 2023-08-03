/* eslint-disable no-console */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MuseumTheme from '../components/Themes/MuseumTheme';
import PhotoTheme from '../components/Themes/PhotoTheme';
import WindowTheme from '../components/Themes/WindowTheme';
import { AxiosErrorResponseType, StoryListType } from '../utils/types';

const OpenedStoryPage = () => {
  const { capsule_id } = useParams();
  const navigate = useNavigate();
  const [openStory, setOpenStory] = useState<StoryListType[]>([]);
  const [themeId, setThemeId] = useState<number>(1);

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
  const storyInfoAPI = async () => {
    try {
      await axios.get(`/api/v1/capsules/${capsule_id}`).then((response) => {
        console.log('theme_id: ', response.data.capsule_data.theme_id);
        setThemeId(response.data.capsule_data.theme_id);
      });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        alert(axiosError.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    openStoryAPI();
    storyInfoAPI();
  }, []);

  return (
    <div>
      <div
        className={`${(themeId === 1 || themeId === 3) ? 'top-[-2rem] left-[-1rem]' : 'top-[13.9rem] left-[-1rem]'} absolute  cursor-pointer  z-10`}
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
      {themeId === 1 ? (
        <PhotoTheme openStory={openStory} />
      ) : themeId === 2 ? (
        <MuseumTheme openStory={openStory} />
      ) : themeId === 3 ? (
        <WindowTheme openStory={openStory} />
      ) : null}
    </div>
  );
};

export default OpenedStoryPage;
