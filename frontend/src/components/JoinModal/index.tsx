// Modal.tsx

import React from 'react';
import noteImg3 from '../../assets/images/note/note3.png';
import ImageUploadButton from '../ImageUploadButton';
import TextInput from '../TextInput';

interface ModalProps {
  onClose: () => void;
}

const JoinModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-Omu">
      <div className="relative">
        <img className="w-100 h-120" src={noteImg3} />
        <div className="flex flex-col w-full h-full bg-red-200 top-0 right-0 absolute pr-20 pl-28 pt-20 pb-8">
          <span className="close flex justify-end" onClick={onClose}>
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
            <div className="pt-5">
              <ImageUploadButton />
            </div>
            <div>
              <form method="post" action="서버의url" id="join-form">
                <TextInput
                  label="ID"
                  placeholder="아이디를 입력해주세요"
                  title="join"
                  type="text"
                />
                <TextInput
                  label="PW"
                  placeholder="비밀번호를 입력해주세요"
                  title="join"
                  type="password"
                />
                <TextInput
                  label="PW v2"
                  placeholder="비밀번호를 입력해주세요"
                  title="join"
                  type="password"
                />
                <TextInput
                  label="Email"
                  placeholder="이메일을 입력해주세요"
                  title="join"
                  type="email"
                />
                <TextInput
                  label="Nickname"
                  placeholder="닉네임을 입력해주세요"
                  title="join"
                  type="text"
                />
              </form>
            </div>
            <div className="flex items-center justify-center text-white w-28 h-7 bg-[#B78A5B] mt-3 text-sm rounded-2xl">
              회원가입 완료
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
