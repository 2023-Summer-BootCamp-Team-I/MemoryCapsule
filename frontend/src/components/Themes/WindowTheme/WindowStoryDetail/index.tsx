import { useEffect, useState } from 'react';
import open_my_capsule from '../../../../assets/data/open_my_capsule';
import { OpenCapsuleType } from '../../../../utils/types';

type StoryDetailProps = {
  storyId: number | undefined;
};

const insideDivStyle = {
  borderTop: '2px solid black',
  borderLeft: '2px solid black',
  borderBottom: '2px solid white',
  borderRight: '2px solid white',
};

const contentDivStyle = {
  borderTop: '2px solid #F4F4F4',
  borderLeft: '2px solid #8C8C8C',
  borderBottom: '2px solid #8C8C8C',
  borderRight: '2px solid #B1B1B1',
};

function WindowStoryDetail({ storyId }: StoryDetailProps) {
  const [dummy_data, setDummyData] = useState<OpenCapsuleType[]>([]);

  useEffect(() => {
    setDummyData(open_my_capsule());
  }, []);

  return (
    <div>
      {/* {storyId&& dummy_data[storyId].img && <div style={insideDivStyle} className='w-[28rem] h-[24rem] object-cover m-3'><img src={dummy_data[storyId].img} className='w-[28rem] h-[24rem] object-cover'/></div>} */}
      {storyId !== undefined && dummy_data[storyId] && dummy_data[storyId].img && (
        <div className="flex">
          <div style={insideDivStyle} className="w-[28rem] h-[26rem] object-cover m-3">
            <img src={dummy_data[storyId].img} className="object-cover w-full h-full" />
          </div>
          <div className="w-[15rem] h-[24.7rem] mt-[1rem] text-left">
            <div className="h-1/5" style={contentDivStyle}>
              <div className="ml-2 -mt-3 bg-[#C6C6C6] w-11">
                <span className="">Title</span>
                <br />
              </div>
              <span className="ml-1">{dummy_data[storyId].name}</span>
            </div>

            <div className="mt-4 h-4/5" style={contentDivStyle}>
              <div className="ml-2 -mt-3 bg-[#C6C6C6] w-16">
                <span>Content</span>
              </div>
              <span className="ml-1">
                진정한 내 칭구야~ <br />
                우리 오래오래 친하게 지내자~
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WindowStoryDetail;
