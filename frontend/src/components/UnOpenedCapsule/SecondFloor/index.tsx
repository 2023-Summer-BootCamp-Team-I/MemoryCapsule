import React, { useEffect, useState } from 'react';
import plusbutton from '../../../assets/images/plusbutton.png';
import titlemark from '../../../assets/images/titlemark.png';
import subtitlemark from '../../../assets/images/subtitlemark.png';
import letter from '../../../assets/images/letter.png';
import dumy, { pictures } from '../../dumy';
import note from '../../../assets/images/note/note1.png';
import StoryCreateContent from '../../StoryCreateContent';
import StoryDetailContent from '../../StoryDetailContent';

type StoryModalProps = {
  img: string;
  title: string;
  content: string;
  onClose: () => void;
};

function SecondFloor() {
  console.log(dumy);

  useEffect(() => {
    const scrollbarStyle = `
      .title-wrapper {
        position: relative;
        margin: auto;
        height: 90px;
        width: 300px;
        margin-top: -110px;
        margin-bottom: 30px;
      }
      .title {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 35px;
        font-weight: bold;
      }
      .plus-button-wrapper {
        position: relative;
        margin-top: 0px;
      }
      .custom-scroll-container {
        width: 1000px;
        height: 400px;
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
      img {
        margin-bottom: -30px;
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

  // const StoryCreateContent = () => {
  //   return <div>Story Create Content</div>;
  // };

  // // StoryDetailContent 컴포넌트
  // const StoryDetailContent = () => {
  //   return <div>Story Detail Content</div>;
  // };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true); // 이미지 클릭 시 모달 창 열기
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setIsOpen(false); // 모달 창 닫기
  };

  const StoryModal = ({ img, title, content }: StoryModalProps) => {
    return (
      <div>
        <div
          className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75"
              aria-hidden="true"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="relative">
                <img src={note} className="w-full h-full" alt="Note" />
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
                  {content === 'create' ? (
                    <StoryCreateContent />
                  ) : (
                    <StoryDetailContent title={title} img={img} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="plus-button-wrapper">
      <div className="title-wrapper">
        <img src={titlemark} alt="Title Mark" />
        <h2 className="title">#제주도</h2>
      </div>
      <div className="custom-scroll-container">
        <div className="custom-scroll-content">
          {dumy.map((picture: pictures, index: number) => (
            <div key={index} className="picture-container">
              <div style={{ position: 'relative' }}>
                <img
                  src={subtitlemark}
                  alt="Title"
                  className="w-40"
                  style={{
                    position: 'absolute',
                    marginTop: -25,
                    left: 30,
                    zIndex: 1,
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    marginTop: -10,
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
                  className="image-shadow"
                  style={{ zIndex: 0, marginTop: '20px', marginBottom: '10px', cursor: 'pointer' }}
                  title={picture.owner} // 이미지에 title 속성 추가
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <img src={plusbutton} alt="Plus Button" className="plus-button" />
      </div>
      {selectedImageIndex !== null && (
        <StoryModal
          title={dumy[selectedImageIndex]?.title}
          img={dumy[selectedImageIndex]?.img}
          content="create"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default SecondFloor;
