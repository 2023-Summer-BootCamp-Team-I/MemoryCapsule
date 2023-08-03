/* eslint-disable no-console */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import flowerImg1 from '../assets/images/login/flower1.png';
import flowerImg2 from '../assets/images/login/flower2.png';
import cloudImg from '../assets/images/login/cloud.png';
import flowerImg3 from '../assets/images/login/flower3.png';
import flowerImg4 from '../assets/images/login/flower4.png';

import Login from '../components/Login';
import JoinModal from '../components/JoinModal';
import TreeLottie from '../components/TreeLottie';
import PasswordModal from '../components/MainUnopenCapsule/PasswordModal'; // 비밀

import { loggedInState } from '../utils/Recoil';

function FirstPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [passwdOpen, setPasswdOpen] = useState<boolean>(false);

  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const navigate = useNavigate();
  const [capsuleId, setCapsuleId] = useState<string>('');

  const onSignUp = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closePasswdModal = () => {
    setPasswdOpen(false);
    navigate('/mainunopened');
  };

  const handleClick = () => {
    const storedCapsuleId = sessionStorage.getItem('capsule_id');

    if (storedCapsuleId) {
      setCapsuleId(storedCapsuleId);
      setPasswdOpen(true);
      // eslint-disable-next-line no-console
      console.log('isLoggedIn: ', loggedIn);
    } else {
      setLoggedIn(true);
      // eslint-disable-next-line no-console
      console.log('isLoggedIn: ', loggedIn);
      navigate('/mainunopened');
    }
  };

  return (
    <div className="h-[42rem] w-[75rem]">
      <div className="flex h-1/4">
        <div className="flex justify-end w-1/3">
          <div className="relative mr-10">
            <img className="w-20 h-20 " src={flowerImg1} />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <div className="relative -mb-10">
            <img className="h-20 w-28" src={cloudImg} />
          </div>
        </div>
        <div className="relative flex justify-start w-1/3 -mt-5">
          <div className="relative -mt-5">
            <img className="w-24 h-24" src={flowerImg2} />
          </div>
        </div>
      </div>
      <div className="flex pr-16 h-3/4">
        <div className="flex flex-col items-center justify-around w-1/3 p-6">
          <img className="relative w-16 h-16 -ml-32" src={flowerImg4} />
          <TreeLottie />
        </div>
        <div className="flex flex-col justify-around w-1/2 pb-10">
          <div className="font-Omu">
            <h1 className="mr-24 italic font-bold text-9xl">memory</h1>
            <h1 className="ml-24 italic font-bold text-9xl">capsule</h1>
          </div>
          <Login onSignUp={onSignUp} handleClick={handleClick} />
          {isModalOpen && <JoinModal onClose={closeModal} />}
        </div>
        <div className="flex flex-col items-center justify-around w-1/6 ">
          <img className="relative w-16 h-16 -mr-32" src={flowerImg3} />
          <img className="relative w-16 h-16 -ml-20" src={flowerImg4} />
        </div>
      </div>
      {passwdOpen && <PasswordModal capsuleId={capsuleId} closeModal={() => closePasswdModal()} />}
    </div>
  );
}

export default FirstPage;
