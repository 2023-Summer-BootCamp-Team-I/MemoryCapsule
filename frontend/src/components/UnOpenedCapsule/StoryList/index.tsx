/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import plusbutton from '../../../assets/images/plusbutton.png';
import titlemark from '../../../assets/images/titlemark.png';
import subtitlemark from '../../../assets/images/subtitlemark.png';
import letter from '../../../assets/images/letter.png';
import note from '../../../assets/images/note/note1.png';

import StoryCreateContent from '../../StoryCreateContent';
import StoryDetailContent from '../../StoryDetailContent';
import ProfileButton from '../../ProfileButton';
import CapsuleInfo from '../../CapsuleInfo';
import story_dummy from '../../../assets/data/story_dummy';
import {
  StoryListType,
  StoryListOneType,
  AxiosErrorResponseType,
  MyCapsuleListType,
} from '../../../utils/types';
import Checkbox from '../CheckBox';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../../../utils/Recoil';

type StoryModalProps = {
  story_data?: StoryListOneType | undefined;
  type: 'create' | 'detail';
  onClose: () => void;
};

interface StoryListProps {
  capsule_id: string | undefined;
}

function StoryList({ capsule_id }: StoryListProps) {
  console.log(story_dummy);

  const token = useRecoilValue(TokenState);
  const [storyList, setStoryList] = useState<StoryListType[]>([]);
  const [capsuleData, setCapsuleData] = useState<MyCapsuleListType>();

  const storyListAPI = async () => {
    try {
      await axios.get(`/api/v1/stories/${capsule_id}?jwt_token=${token}`).then((response) => {
        console.log('response: ', response);
        console.log(response.data.story_list);
        setStoryList(response.data.story_list);
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
  const capsuleInfoAPI = async () => {
    console.log('capsule_id: ', capsule_id);

    try {
      await axios.get(`/api/v1/capsules/${capsule_id}?jwt_token=${token}`).then((response) => {
        console.log('response: ', response);
        console.log('data: ', response.data.capsule_data);
        setCapsuleData(response.data.capsule_data);
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
    storyListAPI(); //페이지에 처음 접속했을때 capsule 목록을 보여주기 위해
    capsuleInfoAPI();
  }, []);

  useEffect(() => {
    const scrollbarStyle = `
      .title-wrapper {
        position: absolute;
        margin: auto;
        height: 90px;
        width: 250px;
        margin-top: -80px;
        left: 0;
        right: 0;
      }
      .title {
        position: absolute;
        width:190px;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        margin-top: -5px;
      }
      .plus-button-wrapper {
        position: relative;
        margin-top: 0px;
      }
      .custom-scroll-container {
        width: 1000px;
        height: 510px;
        overflow: auto;
      }
      
      .custom-scroll-content {
        display: flex;
        flex-wrap: wrap;
        gap: 2.0rem;
      }
      
      .custom-scroll-container::-webkit-scrollbar {
        width: 8px;
      }
      
      .custom-scroll-container::-webkit-scrollbar-thumb {
        background-color: #B2B3B3;
        border-radius: 4px;
      }
      
      .custom-scroll-container::-webkit-scrollbar-track {
        background-color: #DFDFDF;
        border-radius: 4px;
      }
      
      .custom-scroll-container::-webkit-scrollbar-thumb:hover {
        background-color: #555555;
      }
      .plus-button {
        position: absolute;
        right: -10px;
        margin-top: 25px;
      }
      .image-shadow {
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyle;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [modalType, setModalType] = useState<'create' | 'detail' | null>(null);
  const [storyOne, setStoryOne] = useState<StoryListOneType>();

  const storyListOneAPI = async (story_id: number) => {
    try {
      await axios
        .get(`/api/v1/stories/${capsule_id}/${story_id}?jwt_token=${token}`)
        .then((response) => {
          console.log('response: ', response);
          setStoryOne(response.data);
          // setStoryList(response.data.story_list);
        });
    } catch (error) {
      console.log('api 불러오기 실패');
      console.log(error);
    }
  };

  const handleImageClick = (index: number, story_id: number) => {
    const selectedStory = storiesToShow[index];
    if (selectedStory.is_mine !== true) {
      alert('⛔️Access Denied⛔️ You are not the owner of this story');
      return;
    }
    storyListOneAPI(story_id);

    const originalIndex = storyList.findIndex((story) => story === selectedStory);
    setSelectedImageIndex(originalIndex);
    setModalType('detail');
    setIsOpen(true); // 이미지 클릭 시 모달 창 열기]
    // getCapsulesStory(storyId);
  };

  // const [storyId, setStoryId] = useState<string>('');

  // const getStoryId = async () => {
  //   const response = await axios.get('');
  // };

  const handlePlusButtonClick = () => {
    setModalType('create');
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setModalType(null);
    setIsOpen(false);
  };

  // 체크 박스
  const [checked, setChecked] = useState(false);
  const storiesToShow = checked ? storyList.filter((story) => story.is_mine === true) : storyList;

  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
  };

  const StoryModal = ({ story_data, type }: StoryModalProps) => {
    return (
      <div>
        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="relative">
                  <img src={note} className="w-full h-full" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute cursor-pointer w-7 h-7 right-5 top-7"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="absolute top-16 left-20">
                    {type === 'create' ? (
                      <StoryCreateContent capsule_id={capsule_id} />
                    ) : (
                      <StoryDetailContent story_data={story_data} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="plus-button-wrapper">
      <div className="title-wrapper">
        <img src={titlemark} alt="Title Mark" />
        <div className="flex title font-Omu">
          {capsuleData?.capsule_name}
          <div>
            <CapsuleInfo capsule_id={capsule_id} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {/* 참여 유저 확인 모달 */}
        <div className="flex cursor-pointer">
          <ProfileButton capsule_id={capsule_id} />
          <span className="mt-1 ml-2 mr-5 font-Omu">mate</span>
        </div>

        {/* 내 스토리만 보기 체크박스 */}
        <Checkbox checked={checked} onChecked={handleCheckedChange} />
      </div>

      <hr className="my-4 border-gray-200 w-[rem]" />

      <div className="custom-scroll-container">
        <div className="custom-scroll-content">
          {storiesToShow.map((story: StoryListType, index: number) => (
            <div key={index} className="picture-container">
              <div style={{ position: 'relative' }}>
                <img
                  src={subtitlemark}
                  alt="Title"
                  className="w-36"
                  style={{
                    position: 'absolute',
                    marginTop: -25,
                    left: 33,
                    zIndex: 1,
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    marginTop: -13,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    zIndex: 2,
                    fontSize: 20,
                  }}
                >
                  {story.story_title}
                </p>
                <img
                  src={story.is_mine === true ? story.story_url : letter}
                  onClick={() => handleImageClick(index, story.story_id)}
                  alt={String(story.is_mine)}
                  width={220}
                  className={`z-0 object-cover ${
                    story.is_mine === true ? 'h-52' : 'h-full'
                  } w-52 image-shadow`}
                  style={{ zIndex: 0, marginTop: '20px', marginBottom: '10px', cursor: 'pointer' }}
                  title={String(story.is_mine)} // 이미지에 title 속성 추가
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <img
          src={plusbutton}
          alt="Plus Button"
          className="h-16 transition-transform duration-200 cursor-pointer plus-button active:scale-90"
          onClick={handlePlusButtonClick}
        />
      </div>
      {isOpen && modalType === 'create' && <StoryModal type="create" onClose={handleCloseModal} />}
      {isOpen && modalType === 'detail' && selectedImageIndex !== null && (
        <StoryModal story_data={storyOne} type="detail" onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default StoryList;
