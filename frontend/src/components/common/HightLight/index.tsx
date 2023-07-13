import blue_high from '../../../assets/images/highlights/blue_high.png';
import green_high from '../../../assets/images/highlights/green_high.png';

interface HighLightProps {
  color: string;
  title: string;
}

function HighLight({ color, title }: HighLightProps) {
  return (
    <div className="absolute text-xl font-Omu">
      {color === 'blue' && (
        <div className="ml-[0.1rem]">
          <img src={blue_high} className="h-7" />
          <span
            className={`absolute top-0 ${
              title === '내가 참여한 캡슐' ? 'left-[1.7rem]' : 'left-[2rem]'
            }`}
          >
            {title}
          </span>
        </div>
      )}
      {color === 'green' && (
        <div className="">
          <img src={green_high} className="h-7" />
          <span
            className={`absolute top-0 ${
              title === '내가 참여한 캡슐' ? 'left-[1.7rem]' : 'left-[2rem]'
            }`}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
}

export default HighLight;
