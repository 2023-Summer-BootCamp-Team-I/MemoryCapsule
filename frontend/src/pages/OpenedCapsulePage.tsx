// import React, { useState } from 'react';
// import OpenButton from '../components/OpenButton';
// import PhotoLottie from '../components/PhotoLottie';

// export default function OpenedCapsulePage() {
//   const [isLoading, setIsLoading] = useState(false);

//   const clickPhoto = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       document.location.href = '/story';
//     }, 3000);
//   };

//   const clickVideo = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       document.location.href = '/video';
//     }, 3000);
//   };

//   return (
//     <div className="flex items-center justify-around relative h-[42rem] w-[50rem]">
//       <button onClick={clickPhoto}>
//         <OpenButton imageName="photo" />
//       </button>
//       <button onClick={clickVideo}>
//         <OpenButton imageName="video" />
//       </button>
//       {isLoading && (
//         <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white w-full h-full z-50">
//           {/* Add your loading animation component here */}
//           <PhotoLottie />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import OpenButton from '../components/OpenButton';
import PhotoLottie from '../components/PhotoLottie';
import VideoLottie from '../components/VideoLottie';

export default function OpenedCapsulePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lottieType, setLottieType] = useState('');

  const clickPhoto = () => {
    setIsLoading(true);
    setLottieType('photo');
    setTimeout(() => {
      document.location.href = '/story';
    }, 3000);
  };

  const clickVideo = () => {
    setIsLoading(true);
    setLottieType('video');
    setTimeout(() => {
      document.location.href = '/video';
    }, 3000);
  };

  return (
    <div className="flex items-center justify-around relative h-[42rem] w-[50rem]">
      <button onClick={clickPhoto}>
        <OpenButton imageName="photo" />
      </button>
      <button onClick={clickVideo}>
        <OpenButton imageName="video" />
      </button>
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white w-full h-full z-50">
          {lottieType === 'photo' ? <PhotoLottie /> : <VideoLottie />}
        </div>
      )}
    </div>
  );
}
