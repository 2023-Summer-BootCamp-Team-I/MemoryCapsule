import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useContext } from 'react';
// import { AuthContext } from '../../utils/AuthContext'; // AuthContext.tsx가 저장된 경로를 입력해주세요

import { useSetRecoilState, useRecoilState } from 'recoil';
import { loggedInState, UesrDataState } from '../../utils/Recoil';

function Header() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const setLoggedIn = useSetRecoilState(loggedInState)!;
  const [userNickname] = useRecoilState(UesrDataState);

  const handleLogout = async () => {
    await toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      }),
      {
        pending: '로그아웃되었습니다.',
        success: '로그아웃되었습니다.',
        error: '오류가 발생했습니다.',
      }
    );

    navigate('/');
    setLoggedIn(false);
    window.localStorage.removeItem('recoil-persist-2');
  };

  return (
    <div className="flex space-x-10 text-xl font-Omu">
      <div className="mt-1 cursor-pointer" onClick={() => navigate('/mainunopened')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="cursor-pointer">{userNickname.nickname}</div>

      <div className="cursor-pointer" onClick={handleLogout}>
        로그아웃
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
