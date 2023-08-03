/* eslint-disable no-console */
import axios from 'axios';
import { useState } from 'react';
import noteImg3 from '../../assets/images/note/note3.png';
import { AxiosErrorResponseType, JoinUserType } from '../../utils/types';
import ImageUploadButton from '../ImageUploadButton';
import TextInput from '../TextInput';

interface ModalProps {
  onClose: () => void;
}

function JoinModal({ onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    img_file: '',
    nickname: '',
    id: '',
    password: '',
    email: '',
    phone_number: '',
  });
  const [passwordV2, setPasswordV2] = useState('');
  const handleGetInputData = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // eslint-disable-next-line no-console
    console.log('[JoinModal] name: ', name, ', value: ', value);
  };
  const handleGetPwData = (name: string, value: string) => {
    setPasswordV2(value);
    console.log('name: ', name, ', pw v2: ', value);
  };
  const handleGetFileData = (data: string): void => {
    setFormData((prevData) => ({ ...prevData, img_file: data }));
    // eslint-disable-next-line no-console
    console.log('[JoinModal] file data: ', data);
  };

  const isFormDataComplete = (data: JoinUserType) => {
    return Object.values(data).every(
      (value) => value !== null && value !== undefined && value !== ''
    );
  };

  const SignUpAPI = async () => {
    // eslint-disable-next-line no-console
    console.log('formData: ', formData);
    if (formData.password !== passwordV2) {
      alert('비밀번호가 다릅니다!');
      return;
    }

    if (!isFormDataComplete(formData)) {
      alert('모든 값들을 입력해주세요!');
      return;
    }

    if (formData.password !== passwordV2) {
      alert('비밀번호가 다릅니다!');
      return;
    }

    try {
      const response = await axios.post('/api/v1/users/sign-up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // eslint-disable-next-line no-console
      console.log(response);

      alert('회원가입이 완료되었습니다');
      onClose();
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
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-Omu">
      <div className="relative">
        <img className="w-[30rem] h-[40rem]" src={noteImg3} />
        <div className="absolute top-0 right-0 flex flex-col w-full h-full pb-8 pl-20 pr-12 bg-red-200 pt-28">
          <span className="flex justify-end close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer "
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <div className="flex flex-col items-center">
            <div className="py-5">
              <ImageUploadButton type="circle" handlePostFile={handleGetFileData} />
            </div>
            <div>
              <form method="post" action="서버의url" id="join-form" onSubmit={SignUpAPI}>
                <TextInput
                  label="ID"
                  placeholder="아이디를 입력해주세요"
                  title="join"
                  type="text"
                  name="id"
                  handleGetInputData={handleGetInputData}
                />
                <TextInput
                  label="PW"
                  placeholder="비밀번호를 입력해주세요"
                  title="join"
                  type="password"
                  name="password"
                  handleGetInputData={handleGetInputData}
                />
                <TextInput
                  label="PW v2"
                  placeholder="비밀번호를 재입력해주세요"
                  title="join"
                  type="password"
                  name="pw_v2"
                  handleGetInputData={handleGetPwData}
                />
                <TextInput
                  label="Nickname"
                  placeholder="닉네임을 입력해주세요"
                  title="join"
                  type="text"
                  name="nickname"
                  handleGetInputData={handleGetInputData}
                />
                <TextInput
                  label="Email"
                  placeholder="이메일을 입력해주세요"
                  title="join"
                  type="email"
                  name="email"
                  handleGetInputData={handleGetInputData}
                />
                <TextInput
                  label="phone"
                  placeholder="예) 010-0000-0000"
                  title="join"
                  type="phone"
                  name="phone_number"
                  handleGetInputData={handleGetInputData}
                />
              </form>
            </div>
            <button
              className="flex items-center justify-center text-white w-32 h-7 bg-[#B78A5B] p-5 mt-5 text-sm rounded-full"
              onClick={SignUpAPI}
            >
              회원가입 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
