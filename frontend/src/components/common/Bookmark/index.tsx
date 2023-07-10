import shadow_mark from '../../../assets/images/bookmark/shadow_mark.png';

interface BookmarkProps {
  markImage: string;
  alt: string;
  activeState: boolean;
  setActiveState: () => void;
  text: string;
  svgPath: string;
  top: string;
}

export default function Bookmark({
  markImage,
  alt,
  activeState,
  setActiveState,
  text,
  svgPath,
  top,
}: BookmarkProps) {
  return (
    <div
      style={{ top: `${top}rem` }}
      className={'absolute w-44 p-4 flex justify-end items-center ml-[81rem]'}
    >
      <div
        className={`absolute h-20 hover:cursor-pointer ${activeState ? 'z-40' : 'z-30 hover:z-40'}`}
        onClick={() => {
          setActiveState();
        }}
      >
        <img src={markImage} alt={alt} />
        <div className="flex items-center mr-8" style={{ marginTop: -78 }}>
          <span
            className="p-5 text-2xl text-white font-Omu"
            style={
              text === '개 봉'
                ? { letterSpacing: '4px' }
                : {} && text === 'Add '
                ? { letterSpacing: '5px' }
                : {}
            }
          >
            {text}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-white w-7 h-7 "
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={svgPath} />
          </svg>
        </div>
      </div>
      <img src={shadow_mark} alt="Shadow Mark" className="absolute z-20 mt-[1rem] h-20" />
    </div>
  );
}
