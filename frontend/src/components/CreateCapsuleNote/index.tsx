import React, { useState } from 'react';
import noteImg2 from '../../assets/images/note/note2.png';
import SendLottie from '../SendLottie';
import ReactDatePicker from '../ReactDatePicker';
import ImageUploadButton from '../ImageUploadButton';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';
import { useNavigate } from 'react-router-dom';
import { AxiosErrorResponseType } from '../../utils/types';

interface CreateCapsuleNoteProps {
  // onButtonClick: () => void;
  themeName: string;
  themeId: number;
  onApiSuccess: () => void;
}

function CreateCapsuleNote({ themeName, themeId, onApiSuccess }: CreateCapsuleNoteProps) {
  const token = useRecoilValue(TokenState);

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
  const [password, setPassward] = useState('');
  const [file, setFile] = useState('');
  const [date, setDate] = useState(getCurrentDateTime());

  const handleClick = () => {
    if (!file || !title || !password || !date) {
      alert('입력되지 않은 사항이 있습니다.');
      return;
    }
    CapsuleUploadAPI(); // 괄호를 추가하여 함수 호출
  };

  const handlePostFile = (data: string): void => {
    setFile(data);
  };

  const handleGetDate = (date: string) => {
    setDate(date);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassward(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const navigate = useNavigate();

  const CapsuleUploadAPI = async () => {
    //form data 생성
    const formData = new FormData();
    formData.append('jwt_token', token);
    formData.append('capsule_name', title);
    formData.append('due_date', date);
    formData.append('limit_count', '30');
    formData.append('theme_id', String(themeId));
    formData.append('capsule_password', password);
    formData.append('img_file', file);

    // api 요청 보내기
    try {
      await axios
        .post('/api/v1/capsules', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          onApiSuccess();
          setTimeout(() => {
            navigate('/mainunopened'); // navigate after 4 seconds
          }, 4000); // 4000 milliseconds = 4 seconds
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
              value={password}
              placeholder="비밀번호를 입력하세요"
              onChange={handlePasswordChange}
            ></input>
          </div>

          <div className="flex">
            <label className="w-16 text-left">개봉 날짜</label>
            <ReactDatePicker handleGetDate={handleGetDate} />
          </div>
        </form>

        <div className="flex items-center -mt-2 cursor-pointer" onClick={handleClick}>
          <p className="text-xs">
            캡슐 완성하기
          </p>
          <div>
            <SendLottie />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCapsuleNote;
