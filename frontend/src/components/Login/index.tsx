import { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { TokenState, UesrDataState } from '../../utils/Recoil';
import { AxiosErrorResponseType } from '../../utils/types';

import TextInput from '../../components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

import blueImg1 from '../../assets/images/stickers/blue.png';
import blueImg2 from '../../assets/images/stickers/blue2.png';
interface LoginProps {
  onSignUp: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleClick: () => void;
}

function Login({ onSignUp, handleClick }: LoginProps) {
  const setToken = useSetRecoilState(TokenState);
  const setUserData = useSetRecoilState(UesrDataState);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const handleGetInputData = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const LoginAPI = async () => {
    try {
      const response = await axios.post(
        'https://memorycapsule.co.kr/api/v1/users/sign-in',
        formData,
        {
          // const response = await axios.post('/api/v1/users/sign-in', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setToken(response.data.jwt_token);
      setUserData(response.data.data);

      alert(response.data.message);
      handleClick();
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        alert(axiosError.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      LoginAPI();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center -ml-14 font-Omu">
      <div className="flex justify-between" style={{ width: '28rem' }}>
        <img className="z-0 w-24 h-20 " src={blueImg1} />
        <img className="z-0 w-24 h-20" src={blueImg2} />
      </div>

      <div className="flex h-40 p-4 pt-8 w-96 bg-MyYellow shadow-ButtonShadow -mt-14">
        <div className="flex flex-col items-center justify-center w-4/5">
          <form method="post" action="서버의url" id="login-form" onSubmit={LoginAPI}>
            <TextInput
              label="ID"
              placeholder="아이디를 입력해주세요"
              title="login"
              type="text"
              name="id"
              handleGetInputData={handleGetInputData}
            />
            <TextInput
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              title="login"
              type="password"
              name="password"
              handleGetInputData={handleGetInputData}
              handleOnKeyPress={handleOnKeyPress}
            />
          </form>
          <div className="flex justify-end w-full pt-2 pr-4 text-xs">
            <p className=" cursor-pointer text-[#9B8EF8]" onClick={onSignUp}>
              회원가입
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-1/5 ml-4">
          <FontAwesomeIcon
            className="opacity-50 cursor-pointer"
            icon={faSquareCheck}
            size="3x"
            onClick={LoginAPI}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
