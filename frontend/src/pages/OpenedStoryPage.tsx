// import React from 'react';
// import PhotoCard1 from '../components/PhotoCard/PhotoCard1';
// import PhotoCard2 from '../components/PhotoCard/PhotoCard2';
// import PhotoCard3 from '../components/PhotoCard/PhotoCard3';
// import PhotoCard4 from '../components/PhotoCard/PhotoCard4';
// import PhotoCard5 from '../components/PhotoCard/PhotoCard5';
// import PhotoCard6 from '../components/PhotoCard/PhotoCard6';
// // import { StoryType } from '../../utils/types'; // StoryType 타입 가져오기
// import storyDummy from '../assets/data/story_dummy'; // story_dummy 데이터 가져오기

// import cloud from '../assets/images/PhotoTheme/cloud.png';
// import cloud2 from '../assets/images/PhotoTheme/cloud2.png';

// export default function OpenedStoryPage() {
//   return (
//     <div>
//       <div className="flex items-center h-[42rem] w-[75rem] bg-[#d3edff] relative font-Omu">
//         <div className="z-10 flex items-center h-[42rem] w-[75rem] overflow-x-auto p-10 pl-20 ">
//           {storyDummy.map((data, index) => {
//             if (index % 6 === 0) {
//               return <PhotoCard1 key={index} data={data} />;
//             } else if (index % 6 === 1) {
//               return <PhotoCard2 key={index} data={data} />;
//             } else if (index % 6 === 2) {
//               return <PhotoCard3 key={index} data={data} />;
//             } else if (index % 6 === 3) {
//               return <PhotoCard4 key={index} data={data} />;
//             } else if (index % 6 === 4) {
//               return <PhotoCard5 key={index} data={data} />;
//             } else if (index % 6 === 5) {
//               return <PhotoCard6 key={index} data={data} />;
//             } else {
//               return null;
//             }
//           })}
//         </div>
//       </div>
//       <div className="absolute bottom-0 right-0 flex flex-col justify-end items-end fixed h-[42rem] w-[75rem] opacity-80">
//         <img src={cloud} alt="Leaf" className="fixed h-[24em] w-[44rem]" />
//       </div>
//       <div className="absolute bottom-0 right-0 flex flex-col justify-start items-start fixed h-[42rem] w-[75rem] opacity-80">
//         <img src={cloud2} alt="Leaf" className="fixed h-[16em] w-[32rem]" />
//       </div>
//     </div>
//   );
// }

import React from 'react';
import PhotoCard1 from '../components/PhotoCard/PhotoCard1';
import PhotoCard2 from '../components/PhotoCard/PhotoCard2';
import PhotoCard3 from '../components/PhotoCard/PhotoCard3';
import PhotoCard4 from '../components/PhotoCard/PhotoCard4';
import PhotoCard5 from '../components/PhotoCard/PhotoCard5';
import PhotoCard6 from '../components/PhotoCard/PhotoCard6';
import storyDummy from '../assets/data/story_dummy'; // story_dummy 데이터 가져오기

import cloud from '../assets/images/PhotoTheme/cloud.png';
import cloud2 from '../assets/images/PhotoTheme/cloud2.png';

const OpenedStoryPage: React.FC = () => {
  const scrollbarStyle = `
    .custom-scroll-container {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    
    .custom-scroll-container::-webkit-scrollbar {
        height: 30px;
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

  React.useEffect(() => {
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
      <div className="absolute bottom-0 right-0 flex flex-col justify-end items-end fixed h-[42rem] w-[75rem] opacity-80">
        <img src={cloud} alt="Leaf" className="fixed h-[24em] w-[44rem]" />
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col justify-start items-start fixed h-[42rem] w-[75rem] opacity-80">
        <img src={cloud2} alt="Leaf" className="fixed h-[16em] w-[32rem]" />
      </div>
    </div>
  );
};

export default OpenedStoryPage;
