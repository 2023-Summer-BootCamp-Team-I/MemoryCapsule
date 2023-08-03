import { StoryListType } from '../../../../utils/types';

import wrapTextEveryNCharacters from '../../../../assets/data/newline';

type StoryDetailProps = {
  storyId: number | undefined;
  openStory: StoryListType[];
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

function WindowStoryDetail({ storyId, openStory }: StoryDetailProps) {
  return (
    <div>
      {storyId !== undefined && openStory[storyId] && openStory[storyId].story_url && (
        <div className="flex">
          <div style={insideDivStyle} className="w-[28rem] h-[26rem] object-cover m-3">
            <img src={openStory[storyId].story_url} className="object-cover w-full h-full" />
          </div>
          <div className="w-[15rem] h-[24.7rem] mt-[1rem] text-left">
            <div className="h-1/5" style={contentDivStyle}>
              <div className="ml-2 -mt-3 bg-[#C6C6C6] w-11">
                <span className="">Title</span>
                <br />
              </div>
              <span className="ml-1">{openStory[storyId].story_title}</span>
            </div>

            <div className="mt-4 ml-1 h-4/5" style={contentDivStyle}>
              <div className="ml-2 -mt-3 bg-[#C6C6C6] w-16">
                <span>Content</span>
              </div>
              <div className="ml-1">
                <span className="whitespace-pre-line">
                  {wrapTextEveryNCharacters(openStory[storyId].story_content, 23)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WindowStoryDetail;
