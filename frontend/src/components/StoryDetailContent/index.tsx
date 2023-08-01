import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pink from '../../assets/images/stickers/pink.png';
import { StoryListOneType } from '../../utils/types';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';

interface DetailProps {
  story_data: StoryListOneType | undefined;
}

function StoryDetailContent({ story_data }: DetailProps) {
  const navigate = useNavigate();
  const token = useRecoilValue(TokenState);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(String(story_data && story_data.story_title));
  const [editContent, setEditContent] = useState(String(story_data && story_data.story_content));
  const [editImage, setEditImage] = useState(String(story_data && story_data.story_img_url));
  const [selectedImage, setSelectedImage] = useState('');

  const editStoryApi = async () => {
    const formData = new FormData();

    formData.append('jwt_token', token);
    formData.append('story_title', editTitle);
    formData.append('story_content', editContent);
    formData.append('filename', editImage);

    try {
      await axios
        .put(`/api/v1/stories/${story_data?.capsule_id}/${story_data?.story_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
          alert('수정이 완료되었습니다.');
        });
    } catch (error) {
      console.error('에러 발생: ', error);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      editStoryApi();
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const file: any = e.target.files instanceof FileList ? e.target.files[0] : null;

      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   const newImage = event.target?.result as string;
      //   console.log(newImage);
      //   setEditImage(newImage);
      // };
      setEditImage(file);
      setSelectedImage(URL.createObjectURL(file));
      console.log(file);
      console.log(URL.createObjectURL(file));

      // reader.readAsDataURL(file);
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
                src={selectedImage}
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
