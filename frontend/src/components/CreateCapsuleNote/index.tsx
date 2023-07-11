import React from 'react';
import noteImg2 from '../../assets/images/note/note2.png';

import TextInput from '../TextInput';
import SendLottie from '../SendLottie';

function CreateCapsuleNote() {
  const capsule = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
    },
  ];

  // return (
  //   <div className="relative font-Omu ">
  //     <img className="h-[30rem] w-[30rem]" src={noteImg2} />
  //     <div className="flex flex-col  items-center top-10 left-10 absolute h-full w-full py-[2rem] -ml-4">
  //       <img src={capsule[0].img} className="h-[10rem] w-[10rem] object-cover bg-cover" />
  //       <form className="mt-7 pt-3 pb-5" method="post" action="서버의url" id="login-form">
  //         <TextInput label="제목" placeholder="제목을 입력해주세요" title="join" type="text" />
  //         <TextInput label="날짜" placeholder="날짜를 선택해주세요" title="join" type="text" />
  //       </form>
  //       <div className="flex items-center">
  //         <p className="-mt-8 text-xs">
  //           캡슐 완성하기
  //           <br /> 오쪼꼰데
  //         </p>
  //         <SendLottie />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="relative font-Omu ">
      <img className="h-[30rem] w-[30rem]" src={noteImg2} />
      <div className="flex flex-col  items-center top-10 left-10 absolute h-full w-full p-10 -ml-4">
        <img src={capsule[0].img} className="h-[10rem] w-[10rem] object-cover bg-cover" />
        <form className="mt-7 pt-3" method="post" action="서버의url" id="login-form">
          <TextInput label="제목" placeholder="제목을 입력해주세요" title="join" type="text" />
          <TextInput label="날짜" placeholder="날짜를 선택해주세요" title="join" type="text" />
        </form>
        <div className="flex items-center -mt-4">
          <p className="text-xs">
            캡슐 완성하기
            <br /> 오쪼꼰데
          </p>
          <SendLottie />
        </div>
      </div>
    </div>
  );
}

export default CreateCapsuleNote;
