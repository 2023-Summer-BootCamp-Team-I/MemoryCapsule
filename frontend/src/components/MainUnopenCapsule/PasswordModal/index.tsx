// PasswordModal.js

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../../utils/Recoil';

interface PasswordModalProps {
  capsuleId: string;
  closeModal: () => void;
}

export default function PasswordModal({ capsuleId, closeModal }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const password_answer = '1234';
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`Capsule ID: ${capsuleId}, Password: ${password}`);

    // 비밀번호 확인 로직 추가
    if (password === password_answer) {
      // 비밀번호가 올바를 경우 세션 스토리지 clear
      setLoggedIn(true);
      // eslint-disable-next-line no-console
      console.log('isLoggedIn: ', loggedIn);

      alert('로그인 성공하였습니다!');
    } else {
      // 비밀번호가 틀렸을 경우 처리 (예: 에러 메시지 표시)
      alert('비밀번호가 틀렸습니다!');
      setPassword('');
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
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
