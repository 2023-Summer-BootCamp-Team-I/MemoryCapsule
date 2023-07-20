import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

interface User {
  img: string;
  role: string;
  name: string;
  uname: string;
  story: number;
  day: string;
}

function CapsuleInfo() {
  const users: User[] = [
    {
      img: 'https://image.kmib.co.kr/online_image/2020/0729/611819110014854946_3.jpg',
      role: 'host',
      name: '제주도',
      uname: 'zion T',
      story: 3,
      day: '2023.4.21',
    },
  ];

  const navigate = useNavigate();

  const handleDelete = () => {
    // Add the code to actually delete the item
    navigate('/mainunopened'); // Navigate to the desired URL
    window.location.reload();
  };

  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
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

  const hostUser = users.find((user) => user.role === 'host');

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
          className="w-7 h-7 mt-2 ml-3 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Members Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8"
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
              src={users[0].img}
              alt="Original Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="flex justify-center items-center mt-4 font-Omu ">
          <p className="text-5xl">{users[0].name}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="font-Omu mt-8">
            <p className="text-3xl mt-6 ml-12 mr-12">방장 : {hostUser?.uname}</p>
            <p className="text-3xl mt-6 ml-12 mr-12">인원 수 : {users.length}</p>
            <p className="text-3xl mt-6 ml-12 mr-12">개봉 날짜 : {users[0].day}</p>
          </div>
        </div>

        <button
          className="fixed px-4 py-1 font-bold font-Omu text-green bg-red-500 rounded hover:bg-red-700 bottom-12 right-56 text-2xl"
          onClick={closeModal}
        >
          확인
        </button>
        <button
          className="fixed px-4 py-1 font-bold font-Omu text-green bg-red-500 rounded hover:bg-red-700 bottom-12 right-12 text-2xl"
          onClick={outOpenModal}
        >
          나가기
        </button>

        <Modal
          isOpen={outModalIsOpen}
          onRequestClose={outCloseModal}
          contentLabel="Members Modal"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8"
          overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80"
          style={{
            content: {
              width: '260px',
              height: '250px',
            },
          }}
        >
          <h1 className="font-Omu text-2xl">캡슐 나가기</h1>
          <h2 className="font-Omu mt-8 text-xl">나가기를 하면 캡슐목록에서 삭제됩니다.</h2>
          <button
            className="fixed px-4 py-1 font-bold font-Omu text-green bg-red-500 rounded hover:bg-red-700 bottom-3 right-16 text-lg"
            onClick={outCloseModal}
          >
            취소
          </button>
          <button
            className="fixed px-4 py-1 font-bold font-Omu text-green bg-red-500 rounded hover:bg-red-700 bottom-3 right-2 text-lg"
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
