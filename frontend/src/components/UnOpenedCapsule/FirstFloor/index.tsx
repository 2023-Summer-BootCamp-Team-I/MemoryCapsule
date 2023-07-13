import Story from '../../common/Story';
import React, { useEffect } from 'react';

interface Image {
  url: string;
  owner: string;
}

class ImageUploader {
  private images: Image[] = [];
  uploadImage(url: string, owner: string): void {
    const image: Image = { url, owner };
    this.images.push(image);
  }
  getImagesByOwner(owner: string): string[] {
    return this.images.filter((image) => image.owner === owner).map((image) => image.url);
  }
}

class ImageAccessControl {
  private imageUploader: ImageUploader;
  private accessMap: { [key: string]: string } = {};
  constructor(imageUploader: ImageUploader) {
    this.imageUploader = imageUploader;
  }
  grantAccess(user: string, imageOwner: string, image: Image): void {
    const images = this.imageUploader.getImagesByOwner(imageOwner);
    for (const img of images) {
      if (img === image.url) {
        this.accessMap[img] = user;
      }
    }
  }
  revokeAccess(user: string, imageOwner: string): void {
    const images = this.imageUploader.getImagesByOwner(imageOwner);
    for (const img of images) {
      if (this.accessMap[img] === user) {
        delete this.accessMap[img];
      }
    }
  }
  getImageByUser(user: string, image: string): string | null {
    if (this.accessMap[image] === user) {
      return image;
    }
    return '/img/편지지.png';
  }
}

function FirstFloor() {
  const uploader = new ImageUploader();
  const accessControl = new ImageAccessControl(uploader);
  // User1이 이미지 업로드
  uploader.uploadImage(
    'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
    'User1'
  );
  // User2가 이미지 업로드
  uploader.uploadImage(
    'https://newsimg.hankookilbo.com/2022/12/07/edc57134-751b-4e34-8b94-50c6bf39a6fa.jpg',
    'User2'
  );
  // User3가 이미지 업로드
  uploader.uploadImage(
    'https://newsimg.hankookilbo.com/cms/articlerelease/2020/10/14/4b416cc6-581d-4a45-be4d-9021cc129db2.jpg',
    'User3'
  );
  // User1은 자신이 업로드한 이미지를 볼 수 있음
  const user1Images = uploader.getImagesByOwner('User1');
  console.log('user1Images:', user1Images); // ["https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg"]
  // User2는 User1이 올린 이미지를 '이미지 A'로만 볼 수 있음
  const user2Image = accessControl.getImageByUser(
    'User2',
    'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg'
  );
  console.log('user2Image:', user2Image); // "https://image.utoimage.com/preview/cp888480/2019/08/201908009820_500.jpg"
  // User3도 User1이 올린 이미지를 '이미지 A'로만 볼 수 있음
  const user3Image = accessControl.getImageByUser(
    'User3',
    'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg'
  );
  console.log('user3Image:', user3Image); // "https://image.utoimage.com/preview/cp888480/2019/08/201908009820_500.jpg"
  // User2에게 User1이 올린 이미지 접근 권한 부여
  accessControl.grantAccess('User2', 'User1', {
    url: 'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg',
    owner: 'User1',
  });
  // User2는 이제 User1이 올린 이미지를 볼 수 있음
  const user2ImageAfterAccess = accessControl.getImageByUser(
    'User2',
    'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg'
  );

  useEffect(() => {
    const scrollbarStyle = `
      .custom-scroll-container {
        width: 1000px;
        height: 480px;
        overflow: auto;
      }
      
      .custom-scroll-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      
      .custom-scroll-content::-webkit-scrollbar {
        width: 8px;
      }
      
      .custom-scroll-content::-webkit-scrollbar-thumb {
        background-color: #8B4513;
        border-radius: 4px;
      }
      
      .custom-scroll-content::-webkit-scrollbar-track {
        background-color: #F4A460;
        border-radius: 4px;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyle;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  console.log('user2ImageAfterAccess:', user2ImageAfterAccess); // "https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/09/22/20200922000157_0.jpg"

  const title = '경은님 바보';
  return (
    <div className="w-[1000px] h-[480px] flex flex-wrap overflow-auto gap-[1.5rem] custom-scroll">
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={false}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
      <Story
        uploader={uploader}
        accessControl={accessControl}
        title={title}
        isUser={true}
        user1Images={user1Images}
      />
    </div>
    // <div className="flex gap-20 mt-10">
  );
}

export default FirstFloor;
