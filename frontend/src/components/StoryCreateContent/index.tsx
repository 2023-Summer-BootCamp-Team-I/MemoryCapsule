import { useState, ChangeEvent } from 'react';
import pink from '../../assets/images/stickers/pink.png';
import StoryInput from '../common/StoryInput';

function StoryCreateContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files?.[0];
      const newImage = file ? URL.createObjectURL(file) : null;
      setPreviousImage(selectedImage);
      setSelectedImage(newImage);
    } else {
      setSelectedImage(previousImage);
    }
  };

  const handlePreviewClick = () => {
    const fileInput = document.getElementById('image-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmitClick = () => {
    if (!selectedImage || !title || !content) {
      alert('사진, 제목, 내용을 입력해주세요.');
      return;
    }
    alert('업로드되었습니다.');
    window.location.reload();
  };

  return (
    <div>
      {/* Create */}
      <img src={pink} className="fixed h-20 left-14 top-11" alt="Pink" />
      <div className="flex justify-center">
        {selectedImage ? (
          <div className="h-56 w-96">
            <div
              className="object-cover w-full h-full cursor-pointer"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={handlePreviewClick}
            ></div>
          </div>
        ) : (
          <label htmlFor="image-input">
            <div className="flex items-center justify-center h-56 bg-[#E9EEF1] w-96 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-[#BABEC1]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          </label>
        )}
      </div>
      <img src={pink} className="fixed h-20 right-5 top-60" alt="Pink" />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        onClick={() => setPreviousImage(selectedImage)}
        id="image-input"
      />

      <div className="max-w-sm p-4 mt-5 bg-white rounded-lg shadow-lg h-80 font-Omu">

        {/* <div className="pb-2 text-2xl break-words border-b border-gray-200">
          <input placeholder="제목을 입력하세요" className="w-full" maxLength={10} />
        </div> */}
        <StoryInput />
        <div className="max-w-sm pt-2 break-words">
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full resize-none"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          className="fixed px-4 py-1 font-bold text-white bg-[#7DC7A8] rounded bottom-7 right-12 hover:bg-[#449B9C]"
          onClick={handleSubmitClick}
        >
          업로드
        </button>
      </div>
    </div>
  );
}

export default StoryCreateContent;
