import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';
import { AxiosErrorResponseType, MyCapsuleListType } from '../utils/types';

import OpenCapsule from '../components/MainOpenCapsule/OpenCapsule';
import UnopenCapsule from '../components/MainUnopenCapsule/UnopenCapsule';
import GalleryTopBookmark from '../components/CapsuleGallery/GalleryTopBookmark';

type UnopenCapsuleType = {
  id: string;
  img: string;
  name: string;
  num: string;
  day: string;
};

function CapsuleMyGalleryPage() {
  const { is_open } = useParams();
  const navigate = useNavigate();
  const [activeTopBookmark, setActiveTopBookmark] = useState('orange');

  const [myCapsules, setMyCapsules] = useState<(MyCapsuleListType | UnopenCapsuleType)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const token = useRecoilValue(TokenState);

  //캡슐 리스트 불러오기
  const myCapsuleListAPI = async (is_open: boolean) => {
    try {
      await axios
        .get(
          `https://memorycapsule.co.kr/api/v1/capsules?count=-1&is_open=${is_open}&jwt_token=${token}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          setMyCapsules(response.data.my_capsule_list);
        });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        alert(axiosError.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    // 초기 데이터 로드
    if (is_open === 'true') {
      myCapsuleListAPI(true);
    } else {
      myCapsuleListAPI(false);
    }
  }, [is_open]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight) {
      // 스크롤이 컨테이너 하단에 도달했을 때 캡슐 추가 로직 수행
      if (is_open === 'true') {
        setMyCapsules((prevCapsules) => [
          ...prevCapsules,
          ...myCapsules.slice(prevCapsules.length),
        ]);
      } else {
        setMyCapsules((prevCapsules) => [
          ...prevCapsules,
          ...myCapsules.slice(prevCapsules.length),
        ]);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [is_open]);

  return (
    <div className="relative h-[42rem] w-[75rem]">
      <div className="absolute top-0 -mt-[4.5rem]">
        {is_open !== undefined && (
          <GalleryTopBookmark
            activeBookmark={activeTopBookmark}
            setActiveBookmark={setActiveTopBookmark}
            is_open={is_open}
          />
        )}
      </div>

      <div
        className="flex flex-row flex-wrap space-x-[5rem] space-y-[2.5rem] h-[36rem] mt-[4rem] ml-[-4.3rem] overflow-y-scroll font-Omu"
        ref={containerRef}
      >
        {myCapsules?.map((capsule, index) => {
          if (is_open === 'false') {
            const unopenCapsule = capsule as MyCapsuleListType;
            return (
              <div
                key={unopenCapsule.capsule_id}
                onClick={() => navigate(`/unopened/${unopenCapsule.capsule_id}`)}
                className={`hover:cursor-pointer ${index === 0 ? 'ml-[5rem] mt-[2.5rem]' : ''}`}
              >
                <UnopenCapsule capsule={unopenCapsule} />
              </div>
            );
          } else {
            const openCapsule = capsule as MyCapsuleListType;
            return (
              <div
                key={openCapsule.capsule_id}
                onClick={() => navigate(`/opened/${openCapsule.capsule_id}`)}
                className={`hover:cursor-pointer ${index === 0 ? 'ml-[5rem] mt-[2.5rem]' : ''}`}
              >
                <OpenCapsule capsule={openCapsule} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default CapsuleMyGalleryPage;
