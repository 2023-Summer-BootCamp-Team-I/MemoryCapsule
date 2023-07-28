/* eslint-disable no-console */
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import story_video from '../assets/videos/capsule_video.mp4';
import video_frame from '../assets/images/video_frame.png';

export default function OpenedVideoPage() {
  const { capsule_id } = useParams();
  const navigate = useNavigate();

  // const openVideoAPI = async () => {
  //   try {
  //     await axios.get(`/api/v1/videos/${capsule_id}`).then((response) => {
  //       console.log('response: ', response);
  //       console.log(response.data.story_list);
  //       // setOpenStory(response.data.story_list);
  //     });
  //   } catch (error) {
  //     console.log('api 불러오기 실패');
  //     console.log(error);
  //   }
  // };

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
      <div className="fixed -mt-[5.2rem] -ml-[1.38rem] z-40">
        <img src={video_frame} className="w-[56.5rem]" />
      </div>
      <iframe
        width="860"
        height="500"
        src={story_video}
        title="video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="relative z-50"
      ></iframe>
    </div>
  );
}
