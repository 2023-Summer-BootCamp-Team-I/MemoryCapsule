/* eslint-disable no-console */
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosErrorResponseType, OpenCapsuleVideoType } from '../utils/types';
import Stepper from '../components/OpenedCapsuleVideo/Stepper';

export default function OpenedVideoPage() {
  const { capsule_id } = useParams();
  const navigate = useNavigate();
  const [defaultVideo, setDefaultVideo] = useState<OpenCapsuleVideoType>();
  const [extraVideo, setExtraVideo] = useState<OpenCapsuleVideoType[]>([]);
  const [video, setVideo] = useState<OpenCapsuleVideoType | undefined>();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const onCreateOpen = () => {
    setIsCreateOpen(true);
    setIsOpen(false);
  };
  const onCreateClose = () => {
    setIsCreateOpen(false);
    window.location.reload();
  };

  const selectVideo = (selectedVideo: OpenCapsuleVideoType) => {
    setVideo(selectedVideo);
    setIsOpen(false);
  };

  const openVideoAPI = async () => {
    try {
      await axios.get(`/api/v1/videos/${capsule_id}`).then((response) => {
        // console.log('response: ', response);
        console.log(
          'response.data.data.default_video.video_url: ',
          response.data.data.default_video
        );
        console.log('response.data.data.added_video: ', response.data.data.added_video);
        setDefaultVideo(response.data.data.default_video);
        setExtraVideo(response.data.data.added_video);
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

  function Drawer({
    isOpen,
    onClose,
    onOpen,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
  }) {
    return (
      <div>
        {isOpen && <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>}

        <div
          className={`fixed top-0 right-0 w-64 h-full font-Omu bg-white z-50 transform transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between h-8 mt-10">
            <p className="ml-4 text-2xl">Video</p>
            <div className="flex flex-col items-end">
              <button
                onClick={onCreateOpen}
                className="px-4 py-1 text-black transition duration-300 bg-purple-200 rounded hover:bg-purple-300"
              >
                비디오 생성
              </button>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex flex-col items-start">
            <p className="ml-4">최초 생성 비디오</p>

            <button
              className="w-1/2 p-4 hover:shadow-md"
              onClick={() => defaultVideo && selectVideo(defaultVideo)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
              </svg>

              <p className="text-sm text-gray-500">created by {defaultVideo?.creator_nickname}</p>
            </button>
          </div>

          <p className="flex flex-col items-start ml-4">추가로 생성된 비디오</p>

          <div className="flex flex-wrap">
            {extraVideo.map((video, index) => (
              <button
                key={index}
                className="w-1/2 p-4 hover:shadow-md"
                onClick={() => selectVideo(video)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                </svg>

                <p className="text-sm text-gray-500">created by {video.creator_nickname}</p>
              </button>
            ))}
          </div>

          {isOpen ? (
            <button
              className="absolute bottom-16 left-[-38px] bg-white p-2 rounded-l-full rounded-r-none shadow-md"
              onClick={onClose}
            >
              닫기
            </button>
          ) : (
            <button
              className="absolute bottom-16 left-[-120px] bg-white p-2 shadow-md w-32 rounded-l-full rounded-r-none"
              onClick={onOpen}
            >
              다른 비디오 보기
            </button>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    openVideoAPI();
    console.log('video: ', video);
  }, [video]);

  return (
    <div>
      <div
        className="absolute top-[-7.2rem] cursor-pointer left-[-7rem] z-10"
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
      <div style={{ height: '500px' }}>
        <video
          controls
          src={video?.video_url || defaultVideo?.video_url}
          title="video player"
          className="relative h-full"
        />
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

      {isCreateOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-8 bg-white rounded-md w-[44rem] h-[30rem]">
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute w-6 h-6 cursor-pointer top-4 right-4"
              onClick={onCreateClose}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            <h2 className="mb-4 text-xl">비디오 생성하기</h2>
            <div className="flex items-center justify-center flex-grow">
              <Stepper capsule_id={capsule_id} onCreateClose={onCreateClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
