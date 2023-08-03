import React, { useState, useRef, useEffect } from 'react';

type typeProps = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handlePostFile: Function;
};

// React 모듈과 useState, useRef 훅을 가져옴.
function ImageUploadButton({ type, handlePostFile }: typeProps) {
  const [file, setFile] = useState<string | null>(null); //file, setfile 상태변수 선언. 초기값 null
  const [shapeToShow, setShapeToShow] = useState('');

  useEffect(() => {
    if (type === 'circle') {
      setShapeToShow('w-[7.5rem] h-[7.5rem] rounded-full ');
    } else if (type === 'square') {
      setShapeToShow('w-[8rem] h-[8rem] m-4');
    }
  }, [type]);

  // file과 setFile이라는 상태 변수를 선언하고 useState 훅을 사용하여 초기값을 null로 설정
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력시 함수
  // fileInputRef라는 변수를 선언하고 useRef 훅을 사용하여 초기값을 null로 설정. HTMLInputElement 타입으로 지정
  const handleImageClick = () => {
    if (fileInputRef.current) {
      // 현재 사진이 있을 때
      fileInputRef.current.value = ''; // 새로 선택할 수 있게
      fileInputRef.current.click(); // 사진 선택창 뜨게
    }
  };
  // handleImageClick이라는 함수를 정의. 이미지 클릭 시 호출
  // fileInputRef.current가 존재하는 경우, fileInputRef.current.value를 빈 문자열로 설정하여 필드 비우기
  // fileInputRef.current.click()을 호출하여 파일 선택 창을 열기
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // 선택한 파일이 있는지 확인
      const reader = new FileReader(); // 파일을 읽어오기 위한 api로 file reader객체 생성
      reader.onload = (e) => {
        // 파일 읽어오기 완료
        if (e.target && e.target.result) {
          // result 결과를 가져와 데이터 URL형식의 문자열
          setFile(e.target.result.toString()); // toString을 사용하여 문자열로 변환 후 setFile을 통해 파일상태 업로드
        }
      };
      reader.readAsDataURL(event.target.files[0]); // 선택한 파일을 데이터 URL로 읽어옴 //데이터 URL(Data URL)은 텍스트나 바이너리 데이터를 문자열 형태로 인코딩하여 표현하는 URL 형식

      const newFile = event.target.files instanceof FileList ? event.target.files[0] : null;
      handlePostFile(newFile);
    }

    const newFile = event.target.files instanceof FileList ? event.target.files[0] : null;
    handlePostFile(newFile);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className={`${shapeToShow}`}
        style={{
          backgroundColor: '#B6B2B4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={handleImageClick}
      >
        {file ? (
          <img
            src={file}
            alt="Uploaded Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageUploadButton;
