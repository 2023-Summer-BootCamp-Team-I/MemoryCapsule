import { ChangeEvent, useEffect, useState } from 'react';
import pink from '../../assets/images/stickers/pink.png';
import { AxiosErrorResponseType, StoryListOneType } from '../../utils/types';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { TokenState } from '../../utils/Recoil';

interface DetailProps {
  story_data: StoryListOneType | undefined;
}

function StoryDetailContent({ story_data }: DetailProps) {
  // const navigate = useNavigate();
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
      const response = await axios.put(
        `https://memorycapsule.co.kr/api/v1/stories/${story_data?.capsule_id}/${story_data?.story_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status == 200) {
        setEditImage(response.data.story_img_url);

        setEditMode(!editMode);
        alert('수정되었습니다.');
      }
      // console.log('[editStoryAPi] response: ', response);
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        alert(axiosError.response.data.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const handleEdit = () => {
    if (!editMode) {
      setEditMode(!editMode);
    }
    if (editMode) {
      editStoryApi();
    }
  };

  const deleteStoryApi = async () => {
    try {
      await axios
        .delete(
          `https://memorycapsule.co.kr/api/v1/stories/${story_data?.capsule_id}/${story_data?.story_id}?jwt_token=${token}`
        )
        .then(() => {
          alert('삭제 완료되었습니다.');
          window.location.reload();
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const file: any = e.target.files instanceof FileList ? e.target.files[0] : null;

      setEditImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setSelectedImage(String(story_data && story_data.story_img_url));
  }, []);

  return (
    <div>
      {/* Detail */}
      <img src={pink} className="fixed h-20 left-14 top-11" alt="Pink" />
      {editMode ? (
        <div className="flex justify-center h-56 w-96">
          <label htmlFor="image-input">
            <img
              src={selectedImage}
              className="object-cover w-full h-full cursor-pointer"
              alt="Story Image"
            />
          </label>
        </div>
      ) : (
        <div className="flex justify-center h-56 w-96">
          <img src={editImage} className="object-cover w-full h-full" alt="Story Image" />
        </div>
      )}
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
          className="fixed px-4 py-1 font-bold text-white rounded bg-rose-500 hover:bg-rose-700 bottom-7 right-12"
          onClick={deleteStoryApi}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default StoryDetailContent;
