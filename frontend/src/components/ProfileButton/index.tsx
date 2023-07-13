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
      <div className="w-16 h-16 mr-4 overflow-hidden rounded-full">
        <img
          src="path/to/member.png"
          className="object-cover w-full h-full cursor-pointer"
          alt="Member Image"
          onClick={openModal}
        />
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
