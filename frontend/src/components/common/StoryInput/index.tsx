import React, { useState } from 'react';

interface StoryInputProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleGetTitle: Function;
}

function StoryInput({ handleGetTitle }: StoryInputProps) {
  const [value, setValue] = useState<string>('');
  const placeholder = '제목을 입력하세요';

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setValue(newValue);
    handleGetTitle(newValue);
  }

  // useEffect(() => {
  //   const isKorean = (str: string) => {
  //     const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  //     return regex.test(str);
  //   };

  //   if (value.length > 0) {
  //     if (isKorean(value)) {
  //       if (value.length > 7) {
  //         setValue(value.substring(0, 7));
  //       }
  //     } else {
  //       if (value.length > 10) {
  //         setValue(value.substring(0, 10));
  //       }
  //     }
  //   }
  // }, [value]);

  return (
    <div className="pb-2 text-2xl break-words border-b border-gray-200">
      <input
        placeholder={placeholder}
        className="w-full"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default StoryInput;
