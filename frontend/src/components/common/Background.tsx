import Bookmark from './Bookmark';

export default function Background() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="relative h-[43.75rem] w-[81.25rem] bg-[#B1CFEC] rounded-[1.875rem] flex justify-center items-center z-10">
        얍
      </div>
      <div className="sticky z-20 right-60 hover:z-30">
        <Bookmark />
      </div>

      <div className="absolute h-[43.75rem] w-[81.25rem] bg-white rounded-[1.875rem] flex justify-center items-center z-30 left-[3.125rem]">
        얍
      </div>
    </div>
  );
}
