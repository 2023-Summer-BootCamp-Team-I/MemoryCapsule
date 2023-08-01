/* eslint-disable no-console */
//MainOpenedPage

import { useNavigate } from 'react-router-dom';
import HighLight from '../components/common/HightLight';
import OpenCapsule from '../components/MainOpenCapsule/OpenCapsule';

// import open_join_capsule from '../assets/data/open_join_capsule';
// import open_my_capsule from '../assets/data/open_my_capsule';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';
import { MyCapsuleListType } from '../utils/types';

function MainOpenedPage() {
  const navigate = useNavigate();
  const is_open = true;

  // const OpenMyCapsule = open_my_capsule();
  // const openJoinCapsule = open_join_capsule();

  const token = useRecoilValue(TokenState);

  const [OpenMyCapsule, setOpenMyCapsule] = useState<MyCapsuleListType[]>([]);
  const [openJoinCapsule, setOpenJoinCapsule] = useState<MyCapsuleListType[]>([]);

  const capsuleListAPI = async (is_open: boolean) => {
    try {
      await axios
        .get(`/api/v1/capsules?count=5&is_open=${is_open}&jwt_token=${token}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log('response: ', response);
          console.log('response.data.my_capsule_list: ', response.data.my_capsule_list);
          console.log('response.data.capsule_list: ', response.data.capsule_list);
          setOpenMyCapsule(response.data.my_capsule_list);
          setOpenJoinCapsule(response.data.capsule_list);
          // if (is_open === true) {
          //   setOpenMyCapsule(response.data.my_capsule_list);
          //   setOpenJoinCapsule(response.data.capsule_list);
          // } else {
          //   setOpenJoinCapsule(response.data.capsule_list);
          // }
        });
    } catch (error) {
      console.log('api 불러오기 실패');
      console.log(error);
    }
  };

  useEffect(() => {
    capsuleListAPI(is_open);
  }, []);

  return (
    <div className="h-[42rem] w-[75rem] font-Omu grid grid-rows-2 grid-flow-row-dense">
      <div className="mt-[3.5rem]">
        {/* 내가 만든 캡슐 */}
        <div className="flex flex-col space-y-[1.3rem]">
          <div className="">
            <HighLight color="blue" title="내가 만든 캡슐" />
          </div>
          <div className="flex flex-row space-x-[5rem] ml-[0.7rem]">
            {OpenMyCapsule.slice(0, 5).map((capsule) => (
              <div
                key={capsule.capsule_id}
                onClick={() => navigate(`/opened/${capsule.capsule_id}`)}
                className="hover:cursor-pointer"
              >
                <OpenCapsule capsule={capsule} />
              </div>
            ))}
          </div>
          <div
            className="flex self-end text-xl underline cursor-pointer"
            onClick={() => navigate(`/mygallery/${is_open}`)}
          >
            모두 보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mt-[0.2rem] ml-2 mr-[4rem]"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* 내가 참여한 캡슐 */}
        <div className="flex flex-col space-y-[1.3rem]">
          <div className="">
            <HighLight color="blue" title="내가 참여한 캡슐" />
          </div>
          <div className="flex flex-row space-x-[5rem] ml-[0.7rem]">
            {openJoinCapsule.slice(0, 5).map((capsule) => (
              <div
                key={capsule.capsule_id}
                onClick={() => navigate(`/opened/${capsule.capsule_id}`)}
                className="hover:cursor-pointer"
              >
                <OpenCapsule capsule={capsule} />
              </div>
            ))}
          </div>
          <div
            className="flex self-end text-xl underline cursor-pointer"
            onClick={() => navigate(`/joingallery/${is_open}`)}
          >
            모두 보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mt-[0.2rem] ml-2 mr-[4rem]"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainOpenedPage;
