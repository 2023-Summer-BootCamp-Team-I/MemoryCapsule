import { useNavigate } from 'react-router-dom';
import HighLight from '../components/common/HightLight';
import UnopenCapsule from '../components/MainUnopenCapsule/UnopenCapsule';

import unopen_join_capsule from '../assets/data/unopen_join_capsule';
import unopen_my_capsule from '../assets/data/unopen_my_capsule';

function MainUnOpenedPage() {
  const navigate = useNavigate();
  const unopenMyCapsules = unopen_my_capsule();
  const unopenJoinCapsules = unopen_join_capsule();
  const is_open = false;

  return (
    <div className="h-[42rem] w-[75rem] font-Omu grid grid-rows-2 grid-flow-row-dense">
      <div className="mt-[3.5rem]">
        {/* 내가 만든 캡슐 */}
        <div className="flex flex-col space-y-[1.3rem]">
          <div className="">
            <HighLight color="blue" title="내가 만든 캡슐" />
          </div>
          <div className="flex flex-row space-x-[5rem] ml-[0.7rem]">
            {unopenMyCapsules.slice(0, 5).map((capsule) => (
              <div
                key={capsule.id}
                onClick={() => navigate(`/unopened/${capsule.id}`)}
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
            {unopenJoinCapsules.slice(0, 5).map((capsule) => (
              <div
                key={capsule.id}
                onClick={() => navigate(`/unopened/${capsule.id}`)}
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
