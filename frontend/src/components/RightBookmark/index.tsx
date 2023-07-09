import { useState } from 'react';
import blue_mark from '../../assets/images/bookmark/blue_mark.png';
import green_mark from '../../assets/images/bookmark/green_mark.png';
import pink_mark from '../../assets/images/bookmark/pink_mark.png';
import Bookmark from '../common/Bookmark';

export default function RightBookmark() {
  const [isBlueActive, setIsBlueActive] = useState(true);
  const [isGreenActive, setIsGreenActive] = useState(false);
  const [isPinkActive, setIsPinkActive] = useState(false);

  // function setInactiveOtherState() {
  //   if (isBlueActive === true){
  //     setIsGreenActive(false);
  //     setIsPinkActive(false);
  //   } else if (isGreenActive === true){
  //     setIsBlueActive(false);
  //     setIsPinkActive(false);
  //   } else if (isPinkActive === true){
  //     setIsBlueActive(false);
  //     setIsGreenActive(false);
  //   }
  // }

  return (
    <>
      <Bookmark
        markImage={blue_mark}
        alt="Blue Mark"
        activeState={isBlueActive}
        setActiveState={setIsBlueActive}
        setInactiveState={setIsGreenActive}
        text="미개봉"
        svgPath="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        top="8"
      />

      <Bookmark
        markImage={green_mark}
        alt="Green Mark"
        activeState={isGreenActive}
        setActiveState={setIsGreenActive}
        setInactiveState={setIsBlueActive}
        text="개 봉"
        svgPath="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        top="14"
      />

      <Bookmark
        markImage={pink_mark}
        alt="Pink Mark"
        activeState={isPinkActive}
        setActiveState={setIsPinkActive}
        setInactiveState={setIsBlueActive}
        text="Add "
        svgPath="M12 4.5v15m7.5-7.5h-15"
        top="24"
      />
    </>
  );
}
