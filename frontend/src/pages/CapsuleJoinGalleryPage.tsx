import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import GalleryTopBookmark from '../components/CapsuleGallery/GalleryTopBookmark';

import unopen_join_capsule from '../assets/data/unopen_join_capsule';

import OpenCapsule from '../components/MainOpenCapsule/OpenCapsule';
import { AxiosErrorResponseType, MyCapsuleListType } from '../utils/types';
import axios from 'axios';
import { TokenState } from '../utils/Recoil';
import { useRecoilValue } from 'recoil';
import UnopenCapsule from '../components/MainUnopenCapsule/UnopenCapsule';

type UnopenCapsuleType = {
  id: string;
  img: string;
  name: string;
  num: string;
  day: string;
};

export default function CapsuleJoinGalleryPage() {
  const { is_open } = useParams();
  const [activeTopBookmark, setActiveTopBookmark] = useState('purple');

  const [joinCapsules, setJoinCapsules] = useState<(MyCapsuleListType | UnopenCapsuleType)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const token = useRecoilValue(TokenState);

  //캡슐 리스트 불러오기
  const myCapsuleListAPI = async (is_open: boolean) => {
    try {
      await axios
        .get(`/api/v1/capsules?count=-1&is_open=${is_open}&jwt_token=${token}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          setJoinCapsules(response.data.capsule_list);
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
        setJoinCapsules((prevCapsules) => [
          ...prevCapsules,
          ...joinCapsules.slice(prevCapsules.length),
        ]);
      } else {
        setJoinCapsules((prevCapsules) => [
          ...prevCapsules,
          ...unopen_join_capsule().slice(prevCapsules.length),
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
        {joinCapsules?.map((capsule, index) => {
          if (is_open === 'true') {
            const openCapsule = capsule as MyCapsuleListType;
            return (
              <div
                key={openCapsule.capsule_id}
                className={`hover:cursor-pointer ${index === 0 ? 'ml-[5rem] mt-[2.5rem]' : ''}`}
              >
                <OpenCapsule capsule={openCapsule} />
              </div>
            );
          } else {
            const unopenCapsule = capsule as MyCapsuleListType;
            return (
              <div
                key={unopenCapsule.capsule_id}
                className={`hover:cursor-pointer ${index === 0 ? 'ml-[5rem] mt-[2.5rem]' : ''}`}
              >
                <UnopenCapsule capsule={unopenCapsule} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
