import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loggedInState, TokenState } from '../../../utils/Recoil';
import { AxiosErrorResponseType } from '../../../utils/types';

interface PasswordModalProps {
  capsuleId: string | undefined;
  closeModal: () => void;
}

export default function PasswordModal({ capsuleId, closeModal }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const setLoggedIn = useSetRecoilState(loggedInState);
  const token = useRecoilValue(TokenState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jwt_token', token);
    formData.append('capsule_password', password);

    try {
      await axios
        .post('http://localhost:80/api/v1/capsules/users', {
          jwt_token: token,
          capsule_id: Number(capsuleId),
          capsule_password: password,
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);

          setLoggedIn(true);
          alert(response.data.message);
        });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        if (axiosError.response?.data.message === '이미 캡슐에 포함된 유저입니다.') {
          alert(axiosError.response.data.message);
          setLoggedIn(true);
        } else {
          alert(axiosError.response.data.message);
        }
      } else {
        alert('An unknown error occurred.');
      }
      setPassword('');
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 bg-white rounded-md">
        <h2 className="mb-4 text-2xl">Capsule ID: {capsuleId}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col space-y-2">
            <span>Password를 입력해주세요!</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-md"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 text-black bg-[#FDE5C3] hover:bg-[#FFD08E] rounded-md"
          >
            확인
          </button>
        </form>
        <button onClick={closeModal} className="px-4 mt-4 text-black rounded-md">
          닫기
        </button>
      </div>
    </div>
  );
}
