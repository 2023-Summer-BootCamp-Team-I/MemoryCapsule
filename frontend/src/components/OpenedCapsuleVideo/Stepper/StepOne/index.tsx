/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../../../../utils/Recoil';
import { AxiosErrorResponseType, StoryListType } from '../../../../utils/types';

interface StepOneProps {
  capsule_id: string | undefined;
  // eslint-disable-next-line no-unused-vars
  setCurrentStep: (step: number) => void;
}

function StepOne({ capsule_id, setCurrentStep }: StepOneProps) {
  const token = useRecoilValue(TokenState);
  const [openStory, setOpenStory] = useState<StoryListType[]>([]);
  const [selectedStories, setSelectedStories] = useState<number[]>([]);

  const openStoryAPI = async () => {
    try {
      const response = await axios.get(`/api/v1/stories/${capsule_id}`);
      setOpenStory(response.data.story_list);
      console.log('response: ', response.data);
    } catch (error) {
      console.error('API fetch failed', error);
    }
  };

  const handleStoryClick = (story_id: number) => {
    if (selectedStories.includes(story_id)) {
      setSelectedStories((prev) => prev.filter((id) => id !== story_id));
    } else if (selectedStories.length < 20) {
      setSelectedStories((prev) => [...prev, story_id]);
    }
  };

  const makeVideoAPI = async () => {
    setCurrentStep(1);

    try {
      await axios
        .post(`/api/v1/videos/${capsule_id}`, {
          jwt_token: token,
          music_id: 1,
          user_choice_image: selectedStories,
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
          setCurrentStep(2);
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
    console.log(selectedStories);
  }, [token, capsule_id, selectedStories]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-3 overflow-y-auto max-h-72">
        {openStory.map((story) => (
          <div
            key={story.story_id}
            onClick={() => handleStoryClick(story.story_id)}
            className="relative overflow-hidden rounded-md cursor-pointer"
          >
            <img
              src={story.story_url}
              alt={story.story_title}
              className="object-cover w-full h-32"
            />
            <p className="mt-2 text-center">{story.story_title}</p>
            <div
              className={`absolute flex items-center justify-center w-6 h-6 rounded-full top-2 right-2 ${
                selectedStories.includes(story.story_id) ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {selectedStories.includes(story.story_id)
                ? selectedStories.indexOf(story.story_id) + 1
                : ''}
            </div>
          </div>
        ))}
      </div>
      <button
        className="float-right px-4 py-1 mt-6 -mr-4 text-white bg-blue-500 rounded"
        onClick={() => makeVideoAPI()}
      >
        비디오 생성하러가기!
      </button>
    </div>
  );
}

export default StepOne;
