import { useState } from 'react';

import note from '../../../assets/images/note/note1.png';
import StoryCreateContent from '../../StoryCreateContent';
import StoryDetailContent from '../../StoryDetailContent';

type StoryModalProps = {
  title: string;
  content: string;
  onClose: () => void;
};

function StoryModal({ title, content, onClose }: StoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  onClose();

  return (
    <div>
      <div className="px-4 py-2 font-bold text-white bg-blue-500 rounded" onClick={handleOpen}>
        {title}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75"
              aria-hidden="true"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="relative">
                <img src={note} className="w-full h-full" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute cursor-pointer w-7 h-7 right-5 top-7"
                  type="button"
                  onClick={handleClose}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="absolute top-16 left-20">
                  {content === 'create' ? <StoryCreateContent /> : <StoryDetailContent />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryModal;
