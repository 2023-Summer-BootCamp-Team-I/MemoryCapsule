import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { UesrDataState } from '../../utils/Recoil';
import { MyCapsuleListType } from '../../utils/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface KakaoProps {
  capsule_id: string;
  state: string;
  capsuleData: MyCapsuleListType | undefined;
}

function KakaoShare({ capsule_id, state, capsuleData }: KakaoProps) {
  const userData = useRecoilValue(UesrDataState);

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // SDK가 이미 초기화된 경우, SDK를 다시 초기화하지 않습니다.
      if (!kakao.isInitialized()) {
        // JavaScript 키를 사용하여 SDK를 초기화합니다.
        kakao.init(import.meta.env.VITE_APP_KAKAO_API_KEY);
      }
    }
  }, []);

  function shareKakao() {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `${userData.nickname}님이 ${capsuleData?.capsule_name}에서의 특별한 추억을 함께 만들자고 초대하셨어요!`,
        // description: `같이 와서 추억을 공유해봐요!\n[캡슐 비밀번호] ${password}`,
        description: `추억을 함께 만들어요! \n🔒비번: ${capsuleData?.capsule_password}`,
        imageUrl: `${capsuleData?.capsule_img_url}`, // 공유할 이미지 URL
        link: {
          mobileWebUrl: `http://localhost/${state}/${capsule_id}`, // 모바일에서 연결될 링크
          webUrl: `http://localhost/${state}/${capsule_id}`, // PC에서 연결될 링크
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      success: function (response: any) {
        // eslint-disable-next-line no-console
        console.log(response);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fail: function (error: any) {
        // eslint-disable-next-line no-console
        console.log(error);
      },
    });
  }

  return (
    <div
      className="justify-between p-2 px-4 z-10 absolute bottom-0 mb-24 flex bg-[#FAE101] cursor-pointer w-24 font-Omu rounded-lg shadow-md"
      onClick={shareKakao}
    >
      <img
        src="//dev.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
        alt="카카오톡 공유하기"
        className="w-7 h-7"
      />
      <div className="text-center pt-[0.1rem]">share</div>
    </div>
  );
}

export default KakaoShare;
