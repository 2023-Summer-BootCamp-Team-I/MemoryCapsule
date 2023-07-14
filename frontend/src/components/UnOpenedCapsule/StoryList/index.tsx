import { useEffect, useState } from 'react';
import plusbutton from '../../../assets/images/plusbutton.png';
import titlemark from '../../../assets/images/titlemark.png';
import subtitlemark from '../../../assets/images/subtitlemark.png';
import letter from '../../../assets/images/letter.png';
import note from '../../../assets/images/note/note1.png';

import StoryCreateContent from '../../StoryCreateContent';
import StoryDetailContent from '../../StoryDetailContent';

import story_dummy from '../../../assets/data/story_dummy';
import { StoryType } from '../../../utils/types';
import Checkbox from '../CheckBox';

type StoryModalProps = {
  img?: string;
  title?: string;
  content?: string;
  type: 'create' | 'detail';
  onClose: () => void;
};

function StoryList() {
  // eslint-disable-next-line no-console
  console.log(story_dummy);

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

  const handleImageClick = (index: number) => {
    // Look up the story in the filtered list.
    const selectedStory = storiesToShow[index];
    // Check ownership of the selected story.
    if (selectedStory.owner !== 'user1') {
      alert('⛔️Access Denied⛔️ You are not the owner of this story');
      return;
    }
    // Look up the index of the selected story in the original list.
    const originalIndex = story_dummy.findIndex((story) => story === selectedStory);
    setSelectedImageIndex(originalIndex);
    setModalType('detail');
    setIsOpen(true); // 이미지 클릭 시 모달 창 열기
  };

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
  const storiesToShow = checked
    ? story_dummy.filter((story) => story.owner === 'user1')
    : story_dummy;

  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
  };

  const StoryModal = ({ img, title, type, content }: StoryModalProps) => {
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
                      <StoryCreateContent />
                    ) : (
                      <StoryDetailContent title={title} img={img} content={content} />
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
        <div className="flex title">
          제주도
          {/* 캡슐 정보 모달 */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mt-2 ml-3 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {/* 참여 유저 확인 모달 */}
        <div className="flex cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mt-1"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
          <span className="mt-1 ml-2 mr-5">3</span>
        </div>

        {/* 내 스토리만 보기 체크박스 */}
        <Checkbox checked={checked} onChecked={handleCheckedChange} />
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="custom-scroll-container">
        <div className="custom-scroll-content">
          {storiesToShow.map((picture: StoryType, index: number) => (
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
                  {picture.title}
                </p>
                <img
                  src={picture.owner === 'user1' ? picture.img : letter}
                  onClick={() => handleImageClick(index)}
                  alt={picture.owner}
                  width={220}
                  className={`z-0 object-cover ${
                    picture.owner === 'user1' ? 'h-52' : 'h-full'
                  } w-52 image-shadow`}
                  style={{ zIndex: 0, marginTop: '20px', marginBottom: '10px', cursor: 'pointer' }}
                  title={picture.owner} // 이미지에 title 속성 추가
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
        <StoryModal
          title={story_dummy[selectedImageIndex]?.title}
          img={story_dummy[selectedImageIndex]?.img}
          type="detail"
          content={story_dummy[selectedImageIndex]?.content}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default StoryList;
