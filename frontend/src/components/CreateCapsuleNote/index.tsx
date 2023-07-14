import noteImg2 from '../../assets/images/note/note2.png';

import SendLottie from '../SendLottie';
import ReactDatePicker from '../ReactDatePicker';

function CreateCapsuleNote() {
  const capsule = [
    {
      img: 'https://cdn.aitimes.kr/news/photo/202303/27617_41603_044.jpg',
      name: '제주도',
    },
  ];

  const handleGoBack = () => {
    history.back(); // 이전 페이지로 돌아가는 함수
  };

  return (
    <div className="relative mt-12">
      <img className="h-[30rem] w-[30rem]" src={noteImg2} />
      <div className="absolute flex flex-col items-center w-full h-full p-10 -ml-4 top-10 left-10">
        <img src={capsule[0].img} className="h-[10rem] w-[10rem] object-cover bg-cover" />
        <form
          className="flex flex-col h-32 text-lg justify-evenly w-68 "
          method="post"
          action="서버의url"
          id="login-form"
        >
          <div className="flex">
            <label className="w-16 text-left">제목</label>
            <input
              className="w-40 text-center outline=none focus:outline-none bg-transparent"
              type="text"
              id="user"
              placeholder="제목을 입력하세요"
            ></input>
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
          <div onClick={handleGoBack}>
            <SendLottie />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCapsuleNote;
