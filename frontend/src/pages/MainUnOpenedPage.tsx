//MainUnOpenedPage

/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import HighLight from '../components/common/HightLight';
import UnopenCapsule from '../components/MainUnopenCapsule/UnopenCapsule';

// import unopen_join_capsule from '../assets/data/unopen_join_capsule';
// import unopen_my_capsule from '../assets/data/unopen_my_capsule';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';
import { useEffect, useState } from 'react';
import { MyCapsuleListType } from '../utils/types';

function MainUnOpenedPage() {
  const navigate = useNavigate();
  // const unopenMyCapsules = unopen_my_capsule();
  // const unopenJoinCapsules = unopen_join_capsule();
  const is_open = false;
  const token = useRecoilValue(TokenState);
  const [myCapsule, setMyCapsule] = useState<MyCapsuleListType[]>([]);
  const [joinCapsule, setJoinCapsule] = useState<MyCapsuleListType[]>([]);

  const capsuleListAPI = async (is_open: boolean) => {
    try {
      await axios
        .get(
          `http://localhost:8080/api/v1/capsules?count=5&is_open=${is_open}&jwt_token=${token}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('response: ', response);
          console.log('response.data.my_capsule_list: ', response.data.my_capsule_list);
          setMyCapsule(response.data.my_capsule_list);
          setJoinCapsule(response.data.capsule_list);
          // if (is_open === true) {
          //   setMyCapsule(response.data.my_capsule_list);
          //   setJoinCapsule(response.data.capsule_list);
          // } else {
          //   setJoinCapsule(response.data.capsule_list);
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
            {myCapsule.map((capsule) => (
              <div
                key={capsule.capsule_id}
                onClick={() => navigate(`/unopened/${capsule.capsule_id}`)}
                className="hover:cursor-pointer"
              >
                <UnopenCapsule capsule={capsule} />
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
            {joinCapsule.map((capsule) => (
              <div
                key={capsule.capsule_id}
                onClick={() => navigate(`/unopened/${capsule.capsule_id}`)}
                className="hover:cursor-pointer"
              >
                <UnopenCapsule capsule={capsule} />
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

export default MainUnOpenedPage;
