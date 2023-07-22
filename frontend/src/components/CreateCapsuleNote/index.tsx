import React from 'react';
import noteImg2 from '../../assets/images/note/note2.png';
import SendLottie from '../SendLottie';
import ReactDatePicker from '../ReactDatePicker';
import ImageUploadButton from '../ImageUploadButton';

interface CreateCapsuleNoteProps {
  onButtonClick: () => void;
  themeName: string;
}

const CreateCapsuleNote: React.FC<CreateCapsuleNoteProps> = ({ onButtonClick, themeName }) => {
  const handleClick = () => {
    onButtonClick();
  };

  return (
    <div className="relative mt-12">
      <img className="h-[30rem] w-[30rem]" src={noteImg2} alt="Note" />
      <div className="absolute flex flex-col items-center w-full h-full p-10 -ml-4 top-10 left-10">
        <ImageUploadButton type="square" />

        <form
          className="flex flex-col h-32 text-lg justify-evenly w-68 "
          method="post"
          action="서버의url"
          id="login-form"
        >
          <div className="flex">
            <label className="w-16 text-left">제목</label>
            <input
              className="w-40 text-center bg-transparent outline-none focus:outline-none"
              type="text"
              id="user"
              placeholder="제목을 입력하세요"
            ></input>
          </div>

          <div className="flex">
            <label className="w-16 text-left">테마</label>
            <span className="w-40 text-center text-gray-400">{themeName}</span>
          </div>

          <div className="flex">
            <label className="w-16 text-left">날짜</label>
            <ReactDatePicker />
          </div>
        </form>

        <div className="flex items-center -mt-4">
          <p className="text-xs">
            캡슐 완성하기
            <br /> 오쪼꼰데
          </p>
          <div onClick={handleClick}>
            <SendLottie />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCapsuleNote;

// import React, { useState } from 'react';
// import noteImg2 from '../../assets/images/note/note2.png';
// import SendLottie from '../SendLottie';
// import ReactDatePicker from '../ReactDatePicker';
// import ImageUploadButton from '../ImageUploadButton';

// interface CreateCapsuleNoteProps {
//   onButtonClick: () => void;
// }

// const CreateCapsuleNote: React.FC<CreateCapsuleNoteProps> = ({ onButtonClick }) => {
//   const handleClick = () => {
//     onButtonClick();
//   };

//   const [userId, setUserId] =useState("");
//   const [capsuleId, setCapsuleId] =useState("");
//   const [creatorId, setCreatorId] =useState("");
//   const [dueDate, setDueDate] =useState("");
//   const [limitCount, setLimitCount] =useState("");
//   const [themeId, setThemeId] =useState("");
//   const [capsulePassword, setCapsulePassword] =useState("");
//   const [imgFile, setImgFile] =useState("");

//   // 사진 업로드 API
//   const ImgUploadAPI = async (e) => {
//     e.preventDefault(); // 새로고침 없앰

//     if (imgFile) {

//       const formData = new FormData();

//       // 폼 데이터 생성 (전달하는 데이터)
//       formData.append('user_id', userId);
//       formData.append('capsule_name', capsuleId);
//       formData.append('creator_id', creatorId);
//       formData.append('due_date', dueDate);
//       formData.append('limit_count', limitCount);
//       formData.append('theme_id', themeId);
//       formData.append('capsule_password', capsulePassword);
//       formData.append('img_file', imgFile);

//       try {
//         const response =  await axios.post('http://localhost:8080/api/v1/capsules', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//         }).then((response) => {
//           console.log('response >> ', response.data);

//           setImage({
//             image_file: '',
//             preview_URL: 'https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif',
//           });
//         } catch (err) {
//           console.log(err);
//         }
//       } else {
//         alert('사진을 등록하세요!');
//       }
//     };

//   return (
//     <div className="relative mt-12">
//       <img className="h-[30rem] w-[30rem]" src={noteImg2} alt="Note" />
//       <div className="absolute flex flex-col items-center w-full h-full p-10 -ml-4 top-10 left-10">
//         <ImageUploadButton type="square" onChange={handleImageChange} />

//         <form
//           className="flex flex-col h-32 text-lg justify-evenly w-68 "
//           method="post"
//           action="서버의url"
//           id="login-form"
//         >
//           <div className="flex">
//             <label className="w-16 text-left">제목</label>
//             <input
//               className="w-40 text-center outline-none focus:outline-none bg-transparent"
//               type="text"
//               id="user"
//               placeholder="제목을 입력하세요"
//             ></input>
//           </div>

//           <div className="flex">
//             <label className="w-16 text-left">날짜</label>
//             <ReactDatePicker />
//           </div>
//         </form>

//         <div className="flex items-center -mt-4">
//           <p className="text-xs">
//             캡슐 완성하기
//             <br /> 오쪼꼰데
//           </p>
//           <div onClick={handleClick}>
//             <SendLottie />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCapsuleNote;
// function axios(arg0: { method: string; url: string; data: FormData; headers: { 'Content-Type': string; Authorization: string; }; }) {
//   throw new Error('Function not implemented.');
// }
