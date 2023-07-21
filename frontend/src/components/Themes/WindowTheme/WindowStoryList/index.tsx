import { OpenCapsuleType } from '../../../../utils/types';

const outsideDivStyle = {
  borderTop: '2px solid white',
  borderLeft: '2px solid white',
  borderBottom: '2px solid black',
  borderRight: '2px solid black',
};

const insideDivStyle = {
  borderTop: '2px solid black',
  borderLeft: '2px solid black',
  borderBottom: '2px solid white',
  borderRight: '2px solid white',
};

const listDivStyle = {
  borderTop: '2px solid #ECECEC',
  borderLeft: '2px solid #ECECEC',
  borderBottom: '2px solid #A5A5A5',
  borderRight: '2px solid #A5A5A5',
};

type StoryListProps = {
  dummy_data: OpenCapsuleType[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleClickStory: Function;
};

function WindowStoryList({ dummy_data, handleClickStory }: StoryListProps) {
  return (
    <div className="h-[56%] w-[57%] m-5 justify-center items-center fixed" style={outsideDivStyle}>
      <div
        className={`h-[51%] w-[54%] w-[${
          dummy_data.length <= 6 ? '54%' : 'calc(54% - 20px)'
        }] overflow-auto m-5 p-5 flex flex-wrap justify-center items-start fixed bg-white`}
        style={insideDivStyle}
      >
        <div className="w-[83%] h-full">
          <div className="grid grid-cols-6 gap-2">
            {dummy_data.map((data, index) => (
              <div
                key={data.id}
                className={`w-24 h-24 ${index >= 6 && 'mt-1'}`}
                style={listDivStyle}
              >
                <div
                  className="w-20 h-20 mx-[0.33rem] my-[0.35rem] cursor-pointer"
                  onClick={() => handleClickStory(index)}
                >
                  <img src={data.img} className="object-cover w-full h-full" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WindowStoryList;
