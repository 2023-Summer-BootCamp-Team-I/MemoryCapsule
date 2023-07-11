import './App.css';
import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { FirstPage } from './pages/FirstPage';
import MainOpenedPage from './pages/MainOpenedPage'; // 메인페이지 개봉 캡슐 리스트
import MainUnOpenedPage from './pages/MainUnOpenedPage'; // 메인페이지 미개봉 캡슐 리스트
import CreateCapsulePage from './pages/CreateCapsulePage'; // 캡슐 생성 페이지

import CapsuleMyGalleryPage from './pages/CapsuleMyGalleryPage'; // 캡슐 모두보기 페이지
import CapsuleJoinGalleryPage from './pages/CapsuleJoinGalleryPage'; // 캡슐 모두보기 페이지
import UnOpenedCapsulePage from './pages/UnOpenedCapsulePage'; // 미개봉 리스트 페이지

import OpenedCapsulePage from './pages/OpenedCapsulePage'; // 개봉 버튼 페이지
import OpenedStoryPage from './pages/OpenedStoryPage'; // 개봉 사진 페이지
import OpenedVideoPage from './pages/OpenedVideoPage'; // 개봉 비디오 페이지
import Background from './components/common/Background';

import { RecoilRoot, useRecoilValue } from 'recoil';
import { loggedInState } from './utils/Recoil';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = useRecoilValue(loggedInState);

  const isFirstRender = useRef(true);

  // 로그인 상태를 확인하고, 로그인이 필요한 페이지에 접근하는 경우 경고를 표시하고 라우트를 변경하는 useEffect
  useEffect(() => {
    if (!loggedIn && location.pathname !== '/') {
      const paths = location.pathname.split('/');
      if (paths[1] === 'unopened') {
        sessionStorage.setItem('capsule_id', paths[2]);
      } else if (paths[1] === 'opened') {
        return;
      }
      console.log('[App] isLoggedIn: ', loggedIn);

      alert('로그인 후, 이용해주세요 😊'); // 경고창 표시
      navigate('/');
    }
  }, [loggedIn, location.pathname]); // location.pathname을 종속성 배열에 추가합니다.

  // 로그인이 된 상태에서 라우트를 변경하는 useEffect
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (loggedIn) {
      const storedCapsuleId = sessionStorage.getItem('capsule_id');
      if (storedCapsuleId) {
        navigate(`/unopened/${storedCapsuleId}`);
      }
    }
  }, [loggedIn]);

  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/mainopened" element={loggedIn ? <MainOpenedPage /> : null} />
      <Route path="/mainunopened" element={loggedIn ? <MainUnOpenedPage /> : null} />
      <Route path="/create" element={loggedIn ? <CreateCapsulePage /> : null} />

      <Route path="/mygallery/:is_open" element={loggedIn ? <CapsuleMyGalleryPage /> : null} />
      <Route path="/joingallery/:is_open" element={loggedIn ? <CapsuleJoinGalleryPage /> : null} />
      <Route path="/unopened/:capsule_id" element={loggedIn ? <UnOpenedCapsulePage /> : null} />

      <Route path="/opened/:capsule_id" element={<OpenedCapsulePage />} />
      <Route path="/story" element={loggedIn ? <OpenedStoryPage /> : null} />
      <Route path="/video" element={loggedIn ? <OpenedVideoPage /> : null} />
    </Routes>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Background>
          <AppRoutes />
        </Background>
      </BrowserRouter>
    </RecoilRoot>
  );
}
