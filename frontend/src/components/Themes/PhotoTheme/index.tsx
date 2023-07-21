import { useEffect } from 'react';
import PhotoCard1 from '../../PhotoCard/PhotoCard1';
import PhotoCard2 from '../../PhotoCard/PhotoCard2';
import PhotoCard3 from '../../PhotoCard/PhotoCard3';
import PhotoCard4 from '../../PhotoCard/PhotoCard4';
import PhotoCard5 from '../../PhotoCard/PhotoCard5';
import PhotoCard6 from '../../PhotoCard/PhotoCard6';

import storyDummy from '../../../assets/data/story_dummy'; // story_dummy 데이터 가져오기

import cloud from '../../../assets/images/PhotoTheme/cloud.png';
import cloud2 from '../../../assets/images/PhotoTheme/cloud2.png';

function PhotoTheme() {
  const scrollbarStyle = `
    .custom-scroll-container {
        overflow: auto;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
    }
    
    .custom-scroll-container::-webkit-scrollbar {
        height: 20px;
    }
    .custom-scroll-container::-webkit-scrollbar-thumb {
        background-color:#afc7f7;
        border-radius: 50px;
    }
    .custom-scroll-container::-webkit-scrollbar-track {
        background-color: #DFDFDF;
        border-radius: 10px;
    }
    .custom-scroll-container::-webkit-scrollbar-thumb:hover {
        background-color: #7b94c6;
    }
  `;

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyle;
    document.head.appendChild(styleElement);
  }, []); // useEffect를 사용하여 스타일이 페이지에 한 번만 추가되도록 설정

  return (
    <div>
      <div className="flex items-center h-[42rem] w-[75rem] bg-[#d3edff] relative font-Omu">
        <div className="z-10 flex items-center h-[42rem] w-[75rem]  p-10 pl-20 custom-scroll-container">
          {storyDummy.map((data, index) => {
            if (index % 6 === 0) {
              return <PhotoCard1 key={index} data={data} />;
            } else if (index % 6 === 1) {
              return <PhotoCard2 key={index} data={data} />;
            } else if (index % 6 === 2) {
              return <PhotoCard3 key={index} data={data} />;
            } else if (index % 6 === 3) {
              return <PhotoCard4 key={index} data={data} />;
            } else if (index % 6 === 4) {
              return <PhotoCard5 key={index} data={data} />;
            } else if (index % 6 === 5) {
              return <PhotoCard6 key={index} data={data} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col justify-end items-end h-[42rem] w-[75rem] opacity-80">
        <img src={cloud} alt="Leaf" className="h-[24em] w-[44rem]" />
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col justify-start items-start h-[42rem] w-[75rem] opacity-80">
        <img src={cloud2} alt="Leaf" className="h-[16em] w-[32rem]" />
      </div>
    </div>
  );
}

export default PhotoTheme;
