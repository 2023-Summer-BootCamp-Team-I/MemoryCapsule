import React from 'react';
import TextInput from '../../components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

import blueImg1 from '../../assets/images/stickers/blue.png';
import blueImg2 from '../../assets/images/stickers/blue2.png';

//로그인/ 회원가입
//  import TextInput from '../components/TextInput';

//  <form method="post" action="서버의url" id="login-form">
//       <TextInput label="ID" placeholder="아이디를 입력해주세요" title="login" type="text" />
//       <TextInput
//         label="비밀번호"
//         placeholder="아이디를 입력해주세요"
//         title="join"
//         type="password"
//       />
//     </form>

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/mainopened');
  };

  return (
    <div className="flex flex-col justify-center items-center -ml-14  font-Omu">
      <div className="flex justify-between" style={{ width: '28rem' }}>
        <img className="w-24 h-20 z-10 " src={blueImg1} />
        <img className="w-24 h-20 z-10" src={blueImg2} />
      </div>

      <div className="flex w-96 h-40 bg-MyYellow shadow-ButtonShadow -mt-14 p-4 pt-8">
        <div className="w-4/5 flex flex-col items-center justify-center">
          <form method="post" action="서버의url" id="login-form">
            <TextInput label="ID" placeholder="아이디를 입력해주세요" title="login" type="text" />
            <TextInput
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              title="login"
              type="password"
            />
          </form>
          <p className="text-xs w-full flex justify-start pt-2 pl-6">회원가입</p>
        </div>
        <div className="w-1/5 ml-4 flex justify-center items-center">
          <FontAwesomeIcon
            className="opacity-50 cursor-pointer"
            icon={faSquareCheck}
            size="3x"
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
