import { StoryListType } from '../../../../utils/types';

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
  openStory: StoryListType[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleClickStory: Function;
};

function WindowStoryList({ openStory, handleClickStory }: StoryListProps) {
  return (
    <div
      className="h-[79%] w-[67%] m-5 justify-center items-center absolute"
      style={outsideDivStyle}
    >
      <div
        className={`h-[92%] w-[95%] w-[${
          openStory.length <= 6 ? '54%' : 'calc(54% - 20px)'
        }] overflow-auto m-5 p-5 flex flex-wrap justify-center items-start absolute bg-white`}
        style={insideDivStyle}
      >
        <div className="w-[83%] h-full">
          <div className="grid grid-cols-6 gap-2">
            {openStory.map((data, index) => (
              <div
                key={data.story_id}
                className={`w-24 h-24 ${index >= 6 && 'mt-1'}`}
                style={listDivStyle}
              >
                <div
                  className="w-20 h-20 mx-[0.33rem] my-[0.35rem] cursor-pointer"
                  onClick={() => handleClickStory(index)}
                >
                  <img src={data.story_url} className="object-cover w-full h-full" alt="" />
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
