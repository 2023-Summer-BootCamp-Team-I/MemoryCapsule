// Modal.tsx

import React from 'react';
import noteImg3 from '../../assets/images/note/note3.png';

interface ModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <img className="w-100 h-120" src={noteImg3} />
        <div className="flex flex-col w-full h-full bg-red-200 top-0 right-0 absolute pr-20 pl-32 pt-20 pb-12">
          <span className="close flex justify-end" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer "
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <div>sss</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
