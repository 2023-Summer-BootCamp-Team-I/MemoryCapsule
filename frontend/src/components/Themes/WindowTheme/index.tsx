import { useState } from 'react';
import { StoryListType } from '../../../utils/types';

import start_logo from '../../../assets/images/window_theme/start_logo.png';
import four_menu from '../../../assets/images/window_theme/four_menu.png';
import document from '../../../assets/images/window_theme/document.png';
import WindowStoryList from './WindowStoryList';
import WindowStoryDetail from './WindowStoryDetail';

interface ThemeProps {
  openStory: StoryListType[];
}

function WindowTheme({ openStory }: ThemeProps) {
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isDivClicked, setDivClicked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isModalButtonClicked, setIsModalButtonClicked] = useState(true);

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
  };
  const [storyId, setStoryId] = useState<number>();

  function handleClickStory(data: number) {
    setStoryId(data);
    setIsStoryModalOpen(true);
  }

  const handleButtonClick = () => {
    setButtonClicked(!isButtonClicked);
  };

  const handleDivClick = () => {
    setDivClicked(!isDivClicked);
  };

  const handleDoubleDivClick = () => {
    setModalOpen(true);
  };

  const handleModalButtonClick = () => {
    setIsModalButtonClicked(!isModalButtonClicked);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const buttonStyle = {
    borderTop: isModalButtonClicked ? '2px solid white' : '2px solid black',
    borderLeft: isModalButtonClicked ? '2px solid white' : '2px solid black',
    borderBottom: isModalButtonClicked ? '2px solid black' : '2px solid white',
    borderRight: isModalButtonClicked ? '2px solid black' : '2px solid white',
  };
  const unpressedButtonStyle = {
    borderTop: '2px solid white',
    borderLeft: '2px solid white',
    borderBottom: '2px solid black',
    borderRight: '2px solid black',
  };

  return (
    <div className="relative h-[42rem] w-[75rem] border bg-[#008080]">
      <div>
        {/* 본문 내용 */}
        <div
          className="flex flex-col items-start mt-3 ml-3"
          onClick={handleDivClick}
          onDoubleClick={handleDoubleDivClick}
        >
          <div className="relative w-16 h-16">
            <img src={document} className="w-full h-full" alt="Document" />
            {isDivClicked && (
              <div className="w-full h-full absolute top-0 left-0 bg-[#11017B] opacity-50"></div>
            )}
          </div>
          <span
            className={`ml-1 text-white cursor-default font-neodgm ${
              isDivClicked ? 'bg-[#11017B]' : ''
            }`}
          >
            Gallery
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 w-[74.95rem] h-10 bg-gray-300">
        <div className="relative w-[74.89rem]  h-[0.2rem] border bg-white">
          <div className="flex items-center justify-start">
            <button
              className={`flex mt-1 font-neodgm px-2 py-[0.2rem] ml-2 transform translate-y-1/5 bg-[#C0C0C0] ${
                isButtonClicked ? 'shadow-white' : 'shadow-black'
              }`}
              style={{
                transition: 'box-shadow 0.1s',
                boxShadow: isButtonClicked
                  ? '-2px -2px 2px rgba(0, 0, 0, 0.5), 2px 2px 2px rgba(255, 255, 255, 0.5)'
                  : '2px 2px 2px rgba(0, 0, 0, 0.5), -2px -2px 2px rgba(255, 255, 255, 0.5)',
              }}
              onClick={handleButtonClick}
            >
              <img src={start_logo} className="h-5 mt-[0.1rem] mr-1" alt="Start Logo" />
              시작
            </button>
            <div className="flex mt-2">
              <div className="w-[0.2rem] h-7 ml-2 bg-[#A9ACAF] -mt-[0.2rem]"></div>
              <div className="w-[0.1rem] h-7 bg-[#E7E8EA] -mt-[0.2rem]"></div>

              <div
                className="w-[0.2rem] rounded h-6 ml-[0.1rem] bg-[#EFEFF1] -mt-[0.1rem]"
                style={{ boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)' }}
              ></div>
              <div className="w-[0.1rem] rounded h-6 bg-[#92959B] -mt-[0.1rem]"></div>
            </div>

            <img src={four_menu} className="h-6 mt-1" />

            <div className="flex mt-2">
              <div className="w-[0.2rem] h-7 ml-2 bg-[#A9ACAF] -mt-[0.2rem]"></div>
              <div className="w-[0.1rem] h-7 bg-[#E7E8EA] -mt-[0.2rem]"></div>

              <div
                className="w-[0.2rem] rounded h-6 ml-[0.1rem] bg-[#EFEFF1] -mt-[0.1rem]"
                style={{ boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)' }}
              ></div>
              <div className="w-[0.1rem] rounded h-6 bg-[#92959B] -mt-[0.1rem]"></div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center font-neodgm">
          <div className="p-[0.1rem] bg-[#C6C6C6] border-[#E8EEEE] border-2 h-[90%] w-[71%]">
            <div
              className={`${
                !isStoryModalOpen
                  ? 'bg-gradient-to-r from-[#16188F] via-[#11017B] to-[#297ECD]'
                  : 'bg-gradient-to-r from-[#7D7D7D] via-[#959595] to-[#B1B1B1]'
              } h-8 flex items-center justify-between`}
            >
              <span className="ml-2 font-bold text-white">Gallery</span>
              <div className="flex">
                <button
                  className="text-white bg-[#C1C1C1] px-3 mr-2"
                  style={buttonStyle}
                  onClick={handleModalButtonClick}
                >
                  _
                </button>
                <button
                  className="text-gray-300 bg-[#C1C1C1] px-3 mr-2"
                  style={{
                    borderTop: '2px solid white',
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid black',
                    borderRight: '2px solid black',
                  }}
                  onClick={closeModal}
                  disabled
                >
                  ㅁ
                </button>
                <button
                  className="text-white bg-[#C1C1C1] px-3 mr-2"
                  style={{
                    borderTop: '2px solid white',
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid black',
                    borderRight: '2px solid black',
                  }}
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
            </div>
            <WindowStoryList openStory={openStory} handleClickStory={handleClickStory} />
          </div>
        </div>
      )}

      {isStoryModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center font-neodgm">
          <div className="p-[0.1rem] bg-[#C6C6C6] border-[#E8EEEE] border-2 h-[71%] w-[61%]">
            <div className="bg-gradient-to-r from-[#16188F] via-[#11017B] to-[#297ECD] h-8 flex items-center justify-between">
              <span className="ml-2 font-bold text-white">Gallery</span>
              <div className="flex">
                <button
                  className="text-gray-300 bg-[#C1C1C1] px-3 mr-2"
                  style={unpressedButtonStyle}
                  disabled
                >
                  _
                </button>
                <button
                  className="text-gray-300 bg-[#C1C1C1] px-3 mr-2"
                  style={{
                    borderTop: '2px solid white',
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid black',
                    borderRight: '2px solid black',
                  }}
                  disabled
                >
                  ㅁ
                </button>
                <button
                  className="text-white bg-[#C1C1C1] px-3 mr-2"
                  style={{
                    borderTop: '2px solid white',
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid black',
                    borderRight: '2px solid black',
                  }}
                  onClick={closeStoryModal}
                >
                  X
                </button>
              </div>
            </div>
            <WindowStoryDetail storyId={storyId} openStory={openStory} />
          </div>
        </div>
      )}
    </div>
  );
}

export default WindowTheme;
