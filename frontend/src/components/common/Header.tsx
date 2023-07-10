import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await toast.promise(
      new Promise((resolve) => {
        setTimeout(resolve, 2000); // 2초 대기
      }),
      {
        pending: '로그아웃되었습니다.',
        success: '로그아웃되었습니다.', // 사실 이 경우에는 success나 error 상태는 발생하지 않지만 필요한 경우에 사용하실 수 있습니다.
        error: '오류가 발생했습니다.',
      }
    );

    navigate('/');
  };

  return (
    <div className="flex space-x-10 text-xl font-Omu">
      <div className="mt-1 cursor-pointer" onClick={() => navigate('/mainunopen')}>
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

      <div className="cursor-pointer">루시</div>

      <div className="cursor-pointer" onClick={handleLogout}>
        로그아웃
      </div>
      <ToastContainer />
    </div>
  );
}

export default Header;
