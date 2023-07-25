import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface KakaoProps {
  capsule_id: string;
  state: string;
}

function KakaoShare({ capsule_id, state }: KakaoProps) {
  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // SDK가 이미 초기화된 경우, SDK를 다시 초기화하지 않습니다.
      if (!kakao.isInitialized()) {
        // JavaScript 키를 사용하여 SDK를 초기화합니다.
        kakao.init('e8c6e3f93e5f6de56e69c8102d21fa51');
      }
    }
  }, []);

  function shareKakao() {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Memory Capsule',
        description: '같이 와서 추억을 공유해봐요!',
        imageUrl: 'https://cdn.pixabay.com/photo/2014/08/24/02/05/time-425818_1280.jpg', // 공유할 이미지 URL
        link: {
          mobileWebUrl: `http://localhost:5173/${state}/${capsule_id}`, // 모바일에서 연결될 링크
          webUrl: `http://localhost:5173/${state}/${capsule_id}`, // PC에서 연결될 링크
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
      className="z-10 absolute bottom-0 mb-24 flex p-2 bg-[#FAE101] cursor-pointer w-20 font-Omu rounded-lg shadow-md"
      onClick={shareKakao}
    >
      <img
        src="//dev.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
        alt="카카오톡 공유하기"
        className="mr-1 w-7 h-7"
      />
      share
    </div>
  );
}

export default KakaoShare;
