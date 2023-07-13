import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pink from '../../assets/images/stickers/pink.png';

interface DetailProps {
  title: string | undefined;
  img: string | undefined;
  content: string | undefined;
}

function StoryDetailContent({ title, img, content }: DetailProps) {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editImage, setEditImage] = useState(img);

  const handleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      alert('수정이 완료되었습니다.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // Add the code to actually delete the item
      alert('삭제 완료되었습니다.');
      navigate('/unopened');
      window.location.reload();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setEditImage(newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Detail */}
      <img src={pink} className="fixed h-20 left-14 top-11" alt="Pink" />
      <div className="flex justify-center h-56 w-96">
        {editMode ? (
          <div>
            <label htmlFor="image-input">
              <img
                src={editImage}
                className="object-cover w-full h-full cursor-pointer"
                alt="Story Image"
              />
            </label>
          </div>
        ) : (
          <img src={editImage} className="object-cover w-full h-full" alt="Story Image" />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        id="image-input"
      />
      <img src={pink} className="fixed h-20 right-5 top-56" alt="Pink" />
      <div className="max-w-sm p-4 mt-5 bg-white rounded-lg shadow-lg h-80 font-Omu">
        <div className="pb-2 text-2xl break-words border-b border-gray-200">
          {editMode ? (
            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          ) : (
            editTitle
          )}
        </div>
        <div className="max-w-sm pt-2 break-words">
          {editMode ? (
            <textarea
              placeholder="내용을 입력하세요"
              className="w-full resize-none"
              rows={10}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            editContent &&
            editContent.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))
          )}
        </div>
        <button
          className="fixed px-4 py-1 font-bold text-white bg-[#7DC7A8] rounded bottom-7 right-28 hover:bg-[#449B9C]"
          onClick={handleEdit}
        >
          {editMode ? '수정완료' : '수정'}
        </button>
        <button
          className="fixed px-4 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700 bottom-7 right-12"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default StoryDetailContent;
