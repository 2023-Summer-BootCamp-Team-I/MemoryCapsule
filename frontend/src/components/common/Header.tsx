import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loggedInState, loggingOutState, UesrDataState } from '../../utils/Recoil';

function Header() {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(loggedInState)!;
  const setLoggingOut = useSetRecoilState(loggingOutState);
  const [userNickname] = useRecoilState(UesrDataState);

  const handleLogout = async () => {
    setLoggingOut(true); // 로그아웃 시작 전에 상태를 true로 설정

    sessionStorage.removeItem('capsule_id');
    setLoggedIn(false);
    window.localStorage.removeItem('recoil-persist-2');

    alert('로그아웃되었습니다');
    navigate('/');

    setLoggingOut(false); // 로그아웃 완료 후에 상태를 false로 설정
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

      <div className="cursor-default">{userNickname.nickname}</div>

      <div className="cursor-pointer" onClick={handleLogout}>
        로그아웃
      </div>
    </div>
  );
}

export default Header;
