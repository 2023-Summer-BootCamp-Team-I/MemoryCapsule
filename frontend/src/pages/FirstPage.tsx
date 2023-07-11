// 로그인/ 회원가입
//  import TextInput from '../components/TextInput';
// <form method="post" action="서버의url" id="login-form">
//         <TextInput label="ID" placeholder="아이디를 입력해주세요" title="login" type="text" />
//         <TextInput
//           label="비밀번호"
//           placeholder="아이디를 입력해주세요"
//           title="join"
//           type="password"
//         />
//       </form>

// FirstPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../utils/Recoil';
import PasswordModal from '../components/MainUnopenCapsule/PasswordModal'; // 비밀번호 입력 모달 컴포넌트 경로를 입력해주세요
// import { AuthContext } from '../utils/AuthContext'; // AuthContext.tsx가 저장된 경로를 입력해주세요

export const FirstPage: React.FC = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!;
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

      console.log('isLoggedIn: ', loggedIn);

      navigate('/mainunopened');
    }
  };

  return (
    <div className="h-[42rem] w-[75rem] border">
      <div>FirstPage</div>
      <button onClick={handleClick}>로그인</button>
      {isModalOpen && (
        <PasswordModal capsuleId={capsuleId} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};
