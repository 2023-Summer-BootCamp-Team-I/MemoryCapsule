import CreateCapsuleNote from '../components/CreateCapsuleNote';
import CreateTheme from '../components/CreateTheme/indext';

function CreateCapsulePage() {
  // const handleValueChange = (value: string) => {
  //   // 전달받은 값을 처리하는 로직을 작성합니다.
  //   console.log('전달받은 값:', value);
  // };

  return (
    <div className="flex items-center justify-center h-[42rem] w-[75rem] font-Omu">
      <div className="flex items-center justify-between w-full p-16">
        <div className="flex flex-col">
          <div className="text-5xl">ㅌ ㅔ ㅁ ㅏ</div>
          <CreateTheme />
        </div>
        <div>
          <CreateCapsuleNote />
        </div>
      </div>
    </div>
  );
}

export default CreateCapsulePage;
