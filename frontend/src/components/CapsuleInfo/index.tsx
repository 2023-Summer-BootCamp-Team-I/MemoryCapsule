import axios from 'axios';
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';
import { AxiosErrorResponseType, MyCapsuleListType } from '../../utils/types';

interface CapsuleInfoProps {
  capsule_id: string | undefined;
}

function CapsuleInfo({ capsule_id }: CapsuleInfoProps) {
  const navigate = useNavigate();
  const token = useRecoilValue(TokenState);
  const [capsuleData, setCapsuleData] = useState<MyCapsuleListType>();

  const handleDelete = async () => {
    try {
      await axios
        .delete(`/api/v1/capsules/users?jwt_token=${token}&capsule_id=${capsule_id}`)
        .then((response) => {
          alert(response.data.message);
          navigate('/mainunopened');
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

  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    capsuleInfoAPI();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [outModalIsOpen, setoutModal] = useState(false);
  const outOpenModal = () => {
    setoutModal(true);
  };
  const outCloseModal = () => {
    setoutModal(false);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setFile(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const capsuleInfoAPI = async () => {
    try {
      await axios.get(`/api/v1/capsules/${capsule_id}?jwt_token=${token}`).then((response) => {
        setCapsuleData(response.data.capsule_data);
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

  return (
    <>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={openModal}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mt-2 ml-3 cursor-pointer w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
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
            width: '500px',
            height: '650px',
          },
        }}
      >
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: '#B6B2B4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            margin: 'auto',
            marginTop: '20px',
          }}
        >
          {file ? (
            <img
              src={file}
              alt="Uploaded Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src={capsuleData?.capsule_img_url}
              alt="Original Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="flex items-center justify-center mt-4 font-Omu ">
          <p className="text-4xl">{capsuleData?.capsule_name}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="mt-8 font-Omu">
            <p className="mt-6 ml-12 mr-12 text-3xl">방장 : {capsuleData?.nickname}</p>
            {/* <p className="mt-6 ml-12 mr-12 text-3xl">인원 수 : {users.length}</p> */}
            <p className="mt-6 ml-12 mr-12 text-3xl">
              개봉 날짜 : {capsuleData?.due_date.slice(0, 10)}
            </p>
          </div>
        </div>

        <button
          className="fixed px-4 py-1 text-2xl font-bold bg-red-500 rounded font-Omu text-green hover:bg-red-700 bottom-12 right-56"
          onClick={closeModal}
        >
          확인
        </button>
        <button
          className="fixed px-4 py-1 font-bold font-Omu text-white bg-[#EF4444] rounded hover:bg-[#B91C1B] bottom-12 right-12 text-2xl"
          onClick={outOpenModal}
        >
          나가기
        </button>

        <Modal
          ariaHideApp={false}
          isOpen={outModalIsOpen}
          onRequestClose={outCloseModal}
          contentLabel="Members Modal"
          className="fixed p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-3xl"
          overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80"
          style={{
            content: {
              width: '350px',
              height: '230px',
            },
          }}
        >
          <h1 className="text-3xl font-Omu">캡슐 나가기</h1>
          <h2 className="mt-8 text-xl font-Omu">나가기를 하면 캡슐목록에서 삭제됩니다.</h2>
          <button
            className="fixed px-4 py-1 text-lg font-bold rounded font-Omu bottom-3 right-20"
            onClick={outCloseModal}
          >
            취소
          </button>
          <button
            className="fixed px-4 py-1 text-lg font-bold bg-[#EF4444] rounded font-Omu text-white hover:bg-[#B91C1B] bottom-3 right-2"
            onClick={handleDelete}
          >
            나가기
          </button>
        </Modal>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </Modal>
    </>
  );
}

export default CapsuleInfo;
