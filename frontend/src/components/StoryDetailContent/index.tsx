import pink from '../../assets/images/stickers/pink.png';

function StoryDetailContent() {
  const story_detail = {
    img: 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg',
    title: '얄라리얄라 얄라셩',
    content:
      '프랑스 여행가려고 했는데ㅠㅠ \n 프랑스 폭동이 일어나서ㅜ \n 우울한 날을 보냈지ㅠㅠㅠssssssssssssssssssABCDslkdfjsldkfjsHelloEveryoneItsParissssssssssssss',
  };
  return (
    <div>
      {/* Detail */}
      <img src={pink} className="fixed h-20 left-14 top-11" />
      <img src={story_detail.img} className="w-96" /> <br />
      <img src={pink} className="fixed h-20 right-5 top-56" />
      <div className="max-w-sm p-4 bg-white rounded-lg shadow-lg h-80 font-Omu">
        <div className="pb-2 text-2xl break-words border-b border-gray-200">
          {story_detail.title}
        </div>
        <div className="max-w-sm pt-2 break-words">
          {story_detail.content.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryDetailContent;
