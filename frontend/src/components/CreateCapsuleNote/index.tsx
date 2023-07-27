/* eslint-disable no-console */
import React, { useState } from 'react';
import noteImg2 from '../../assets/images/note/note2.png';
import SendLottie from '../SendLottie';
import ReactDatePicker from '../ReactDatePicker';
import ImageUploadButton from '../ImageUploadButton';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';

interface CreateCapsuleNoteProps {
  onButtonClick: () => void;
  themeName: string;
  themeId: number;
}

function CreateCapsuleNote({ onButtonClick, themeName, themeId }: CreateCapsuleNoteProps) {
  const token = useRecoilValue(TokenState);

  // const [responseCapsule, setResponseCapsule] = useState('');
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // JS months are 0-based.
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [title, setTitle] = useState('');
  const [passward, setPassward] = useState('');
  const [file, setFile] = useState('');
  const [date, setDate] = useState(getCurrentDateTime());

  const handleClick = () => {
    onButtonClick();
    CapsuleUploadAPI(); // 괄호를 추가하여 함수 호출
    console.log('테마 아이디', themeId);
    // console.log(responseCapsule);
  };

  const handlePostFile = (data: string): void => {
    // 나는 이 함수를 StoryInput이라는 파일에게 전달을 함으로써 값을 가져올 거야 맞지 바바
    setFile(data);
    console.log('[StoryCreateContent] file: ', data);
  };

  const handleGetDate = (date: string) => {
    setDate(date);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 입력값이 변경될 때마다 passward 상태를 업데이트
    setPassward(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 입력값이 변경될 때마다 passward 상태를 업데이트
    setTitle(e.target.value);
  };

  //api
  const CapsuleUploadAPI = async () => {
    // e.preventDefault(); // 새로고침 없앰

    //form data 생성
    const formData = new FormData();
    formData.append('jwt_token', token); //보류
    formData.append('capsule_name', title);
    formData.append('due_date', date);
    formData.append('limit_count', '15'); // 보류
    formData.append('theme_id', String(themeId));
    formData.append('capsule_password', passward);
    formData.append('img_file', file);

    // api 요청 보내기
    try {
      const response = await axios.post('/api/v1/capsules', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('API 요청 에러:', error);
    }
  };

  return (
    <div className="relative mt-12">
      <img className="h-[30rem] w-[30rem]" src={noteImg2} alt="Note" />
      <div className="absolute flex flex-col items-center w-full h-full p-10 -ml-4 top-10 left-10">
        <ImageUploadButton handlePostFile={(data: string) => handlePostFile(data)} type="square" />

        <form
          className="flex flex-col h-32 text-lg justify-evenly w-68 "
          method="post"
          action="서버의url"
          id="login-form"
        >
          <div className="flex">
            <label className="w-16 text-left">테마</label>
            <span className="w-40 text-center text-gray-400">{themeName}</span>
          </div>

          <div className="flex">
            <label className="w-16 text-left">제목</label>
            <input
              className="w-40 text-center bg-transparent outline-none focus:outline-none"
              type="text"
              id="user"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={handleTitleChange}
              style={{ background: 'none' }}
            ></input>
          </div>

          <div className="flex">
            <label className="w-16 text-left">비밀번호</label>
            <input
              className="w-40 text-center bg-transparent outline-none focus:outline-none"
              type="text"
              id="passward"
              value={passward}
              placeholder="비밀번호를 입력하세요"
              onChange={handlePasswordChange}
            ></input>
          </div>

          <div className="flex">
            <label className="w-16 text-left">개봉 날짜</label>
            <ReactDatePicker handleGetDate={handleGetDate} />
          </div>
        </form>

        <div className="flex items-center -mt-4">
          <p className="text-xs">
            캡슐 완성하기
            <br /> 오쪼꼰데
          </p>
          <div onClick={handleClick}>
            <SendLottie />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCapsuleNote;
