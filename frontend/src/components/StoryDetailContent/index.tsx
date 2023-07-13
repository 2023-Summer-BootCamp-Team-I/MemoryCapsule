import pink from '../../assets/images/stickers/pink.png';

interface DetailProps {
  title: string;
  img: string;
}

function StoryDetailContent({ title, img }: DetailProps) {
  const story_detail = {
    img: 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg',
    title: '얄라리얄라 얄라셩',
    content:
      '성훈님... 딩이한테 무슨짓을 하신거에요... ㅡㅡ \n 프랑스 폭동이 일어나서ㅜ \n 우울한 날을 보냈지ㅠㅠㅠssssssssssssssssssABCDslkdfjsldkfjsHelloEveryoneItsParissssssssssssss',
  };
  return (
    <div>
      {/* Detail */}
      <img src={pink} className="fixed h-20 left-14 top-11" />
      <div className="w-96 h-56">
        <img src={img} className="object-cover h-full w-full" /> <br />
      </div>
      <img src={pink} className="fixed h-20 right-5 top-56" />
      <div className="max-w-sm p-4 bg-white rounded-lg shadow-lg h-80 font-Omu mt-5">
        <div className="pb-2 text-2xl break-words border-b border-gray-200">{title}</div>
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
