import React, { useState } from 'react';
import Modal from 'react-modal';

interface User {
  img: string;
  role: string;
  name: string;
}

function ProfileButton() {
  const users: User[] = [
    {
      img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
      role: 'member',
      name: 'zion T',
    },
    {
      img: 'https://www.sisaweek.com/news/photo/201702/86366_66069_2916.jpg',
      role: 'host',
      name: 'zion E',
    },
    {
      img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
      role: 'member',
      name: 'zion F',
    },
    {
      img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
      role: 'member',
      name: 'zion I',
    },
    {
      img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
      role: 'member',
      name: 'zion N',
    },
    {
      img: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
      role: 'member',
      name: 'zion ',
    },
    // Add more user objects as needed
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const usersPerRow = 2; // 한 줄에 보여줄 사용자 수

  // 사용자 배열을 2명씩 묶어서 나열
  const groupedUsers = [];
  for (let i = 0; i < users.length; i += usersPerRow) {
    groupedUsers.push(users.slice(i, i + usersPerRow));
  }

  // // host, member 나누기 배열
  //   let groupedUsers: User[][] = [];
  //   const hosts = users.filter(user => user.role === 'host');
  //   const members = users.filter(user => user.role === 'member');
  //   groupedUsers.push(hosts);
  //   for (let i = 0; i < members.length; i += usersPerRow) {
  //     groupedUsers.push(members.slice(i, i + usersPerRow));
  //   }

  return (
    <>
      <div className="w-7 h-7 mb-[-8rem] mr-[-0.4rem] overflow-hidden rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={openModal}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mt-1"
        >
          <path
            fillRule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
            clipRule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
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
            width: '1100px',
            height: '650px',
          },
        }}
      >
        <div className="text-7xl text-center font-Omu">Capsule Mate</div>
        <hr className="my-5 border-gray-600 border-2 w-4/5 mx-auto" />
        {/* flex justify-center 유저 1명일 때 가운데 정렬 */}
        <div className={users.length === 1 ? 'flex justify-center' : 'w-800 h-350'}>
          {groupedUsers.map((row, rowIndex) => (
            <div className="flex items-center" key={rowIndex}>
              {row.map((user, userIndex) => (
                <div className="flex items-center mt-5 ml-48 mr- mb-4" key={userIndex}>
                  <div className="w-28 h-28 mr-4 overflow-hidden rounded-full">
                    <img src={user.img} className="object-cover w-full h-full" alt="User Image" />
                  </div>
                  <div>
                    <div className="text-2xl text-left font-Omu">{user.role}</div>
                    <div className="text-4xl text-left font-Omu">{user.name}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="absolute top-4 right-4 p-4 text-black" onClick={closeModal}>
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
