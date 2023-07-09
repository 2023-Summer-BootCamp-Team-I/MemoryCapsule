import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './pages/FirstPage'; // 시작페이지

import MainOpenedPage from './pages/MainOpenedPage'; // 메인페이지 개봉 캡슐 리스트
import MainUnOpenedPage from './pages/MainUnOpenedPage'; // 메인페이지 미개봉 캡슐 리스트
import CreateCapsulePage from './pages/CreateCapsulePage'; // 캡슐 생성 페이지

import CapsuleGalleryPage from './pages/CapsuleGalleryPage'; // 캡슐 모두보기 페이지
import UnOpenedCapsulePage from './pages/UnOpenedCapsulePage'; // 미개봉 리스트 페이지

import OpenedCapsulePage from './pages/OpenedCapsulePage'; // 개봉 버튼 페이지
import OpenedStoryPage from './pages/OpenedStoryPage'; // 개봉 사진 페이지
import OpenedVideoPage from './pages/OpenedVideoPage'; // 개봉 비디오 페이지
import Background from './components/common/Background';

export default function App() {
  return (
    <BrowserRouter>
      <Background>
        <Routes>
          <Route path="/" Component={FirstPage} />
          <Route path="/mainopened" Component={MainOpenedPage} />
          <Route path="/mainunopened" Component={MainUnOpenedPage} />
          <Route path="/create" Component={CreateCapsulePage} />

          <Route path="/gallery" Component={CapsuleGalleryPage} />
          <Route path="/unopened" Component={UnOpenedCapsulePage} />

          <Route path="/opened" Component={OpenedCapsulePage} />
          <Route path="/story" Component={OpenedStoryPage} />
          <Route path="/video" Component={OpenedVideoPage} />
        </Routes>
      </Background>
    </BrowserRouter>
  );
}
