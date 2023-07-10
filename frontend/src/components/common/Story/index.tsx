interface StoryProps {
  uploader: any;
  accessControl: any;
  title: string;
  isUser: boolean;
  user1Images: string[];
}
function Story({ uploader, accessControl, title, isUser, user1Images }: StoryProps) {
  return (
    <div>
      <ul className="flex gap-10 p-0 m-2 list-none">
        {isUser
          ? user1Images.map((imageUrl) => (
              <div key={imageUrl} className="relative shadow-ButtonShadow">
                <img src={imageUrl} alt="User1's Image" className="object-cover w-48 h-48 mt-2" />
                <div className="absolute top-[-0.8rem] w-32 left-8">
                  <img src={'/img/제목띠지.png'} alt="제목띠지" />
                  <div className="absolute left-0 w-32 text-white top-3">{title}</div>
                </div>
              </div>
            ))
          : uploader.getImagesByOwner('User3').map((imageUrl: string) => (
              <li key={imageUrl}>
                <div className="relative shadow-ButtonShadow">
                  <img
                    src={
                      accessControl.getImageByUser('User1', imageUrl) === imageUrl
                        ? imageUrl
                        : '/img/letter.png'
                    }
                    className="w-48"
                    alt="User3's Image"
                  />
                  <div className="absolute top-[-0.8rem] w-32 left-8">
                    <img src={'/img/제목띠지.png'} alt="제목띠지" />
                    <div className="absolute left-0 w-32 text-white top-3">{title}</div>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}
export default Story;
