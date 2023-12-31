import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';
import { AxiosErrorResponseType, CapsuleMateType } from '../../utils/types';

import Modal from 'react-modal';

interface ProfileProps {
  capsule_id: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onUserCountChange: (count: number) => void; // 추가
}

function ProfileButton({ capsule_id, onUserCountChange }: ProfileProps) {
  const token = useRecoilValue(TokenState);
  const [capsuleMateHost, setCapsuleMateHost] = useState<CapsuleMateType>();
  const [capsuleMateMember, setCapsuleMateMember] = useState<CapsuleMateType[]>();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    CapsuleMateAPI();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const usersPerRow = 2; // 한 줄에 보여줄 사용자 수

  // 사용자 배열을 2명씩 묶어서 나열
  const groupedUsers: CapsuleMateType[][] = [];
  const totalUsers = (capsuleMateHost ? 1 : 0) + (capsuleMateMember ? capsuleMateMember.length : 0);

  if (capsuleMateHost) {
    // capsuleMateHost를 배열 형식으로 추가
    groupedUsers.push([capsuleMateHost]);
  }

  if (capsuleMateMember) {
    for (let i = 0; i < capsuleMateMember.length; i += usersPerRow) {
      groupedUsers.push(capsuleMateMember.slice(i, i + usersPerRow));
    }
  }

  const CapsuleMateAPI = async () => {
    try {
      await axios
        .get(
          `https://memorycapsule.co.kr/api/v1/capsules/users?capsule_id=${capsule_id}&jwt_token=${token}`
        )
        .then((response) => {
          setCapsuleMateHost(response.data.host_user);
          setCapsuleMateMember(response.data.user);
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
    CapsuleMateAPI();
    onUserCountChange(totalUsers);
  }, [totalUsers]);

  return (
    <>
      <div className="h-7 mb-[-8rem] -ml-[5rem] flex items-center mt-1" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
            clipRule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
        <span className="ml-2">{totalUsers}</span>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Members Modal"
        className="fixed p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-3xl"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80"
        style={{
          content: {
            width: '1100px',
            height: '650px',
          },
        }}
      >
        <div className="text-center text-7xl font-Omu">Capsule Mate</div>
        <hr className="w-4/5 mx-auto my-5 border-2 border-gray-600" />

        <div className="flex justify-center">
          <div
            className="grid items-start grid-cols-2 ml-32 overflow-y-auto gap-y-2"
            style={{ maxHeight: '450px', width: '700px' }}
          >
            {groupedUsers.map((mateGroup, groupIndex) =>
              mateGroup.map((mate, mateIndex) => (
                <div
                  className="flex justify-start w-full mt-5 mb-4"
                  key={`${groupIndex}-${mateIndex}`}
                >
                  <div className="flex items-center">
                    <div className="mr-4 overflow-hidden rounded-full w-28 h-28">
                      <img
                        src={mate.user_img_url}
                        className="object-cover w-full h-full"
                        alt="User Image"
                      />
                    </div>
                    <div>
                      <div className="text-2xl text-left font-Omu">
                        {groupIndex === 0 && mateIndex === 0 ? 'host' : 'member'}
                      </div>
                      <div
                        className={`text-4xl text-left font-Omu ${
                          mate.nickname.length > 22
                            ? 'text-base'
                            : mate.nickname.length > 12
                            ? 'text-lg'
                            : ''
                        } overflow-x-auto whitespace-nowrap`}
                        style={{ maxWidth: '200px' }}
                      >
                        {mate.nickname}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button className="absolute p-4 text-black top-4 right-4" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </Modal>
    </>
  );
}

export default ProfileButton;
