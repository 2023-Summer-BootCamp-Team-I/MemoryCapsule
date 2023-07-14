// 로그인/ 회원가입

import React, { useState } from 'react';

import flowerImg1 from '../assets/images/login/flower1.png';
import flowerImg2 from '../assets/images/login/flower2.png';
import cloudImg from '../assets/images/login/cloud.png';
import flowerImg3 from '../assets/images/login/flower3.png';
import flowerImg4 from '../assets/images/login/flower4.png';

import Login from '../components/Login';
import JoinModal from '../components/JoinModal';
import TreeLottie from '../components/TreeLottie';

const FirstPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSignUp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  import { useNavigate } from 'react-router-dom';
  import { useRecoilState } from 'recoil';
  import { loggedInState } from '../utils/Recoil';
  import PasswordModal from '../components/MainUnopenCapsule/PasswordModal'; // 비밀번호 입력 모달 컴포넌트 경로를 입력해주세요
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [capsuleId, setCapsuleId] = useState<string>('');
  const handleClick = () => {
    const storedCapsuleId = sessionStorage.getItem('capsule_id');
    if (storedCapsuleId) {
      setCapsuleId(storedCapsuleId);
      setModalOpen(true);
      console.log('isLoggedIn: ', loggedIn);
    } else {
      setLoggedIn(true);
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-console
      console.log('isLoggedIn: ', loggedIn);
      navigate('/mainunopened');
    }
  };
  return (
    <div className="h-[42rem] w-[75rem]">
      <div className="h-1/4 flex">
        <div className="w-1/3 flex justify-end">
          <div className="relative mr-10">
            <img className="w-20 h-20 " src={flowerImg1} />
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <div className="relative -mb-10">
            <img className="w-28 h-20" src={cloudImg} />
          </div>
        </div>
        <div className="w-1/3 flex justify-start relative -mt-5">
          <div className="relative -mt-5">
            <img className="w-24 h-24" src={flowerImg2} />
          </div>
        </div>
      </div>
      <div className="flex h-3/4 pr-16">
        <div className="flex flex-col items-center justify-around p-6 w-1/3">
          <img className="w-16 h-16 relative -ml-32" src={flowerImg4} />
          <TreeLottie />
        </div>
        <div className="w-1/2 flex flex-col justify-around  pb-10">
          <div className="font-Omu">
            <h1 className=" text-9xl mr-24 font-bold italic">memory</h1>
            <h1 className="text-9xl ml-24 font-bold italic">capsule</h1>
          </div>
          <Login onSignUp={onSignUp} />
          {isModalOpen && <JoinModal onClose={closeModal} />}
        </div>
        <div className="flex flex-col items-center justify-around w-1/6 ">
          <img className="w-16 h-16 relative -mr-32" src={flowerImg3} />
          <img className="w-16 h-16 relative -ml-20" src={flowerImg4} />
        </div>
      </div>
      <button onClick={handleClick}>로그인</button>
      {isModalOpen && (
        <PasswordModal capsuleId={capsuleId} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default FirstPage;
