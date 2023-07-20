import React, { useRef } from 'react';
import MuseumBg from '../../../assets/images/MuseumBg.png';
import MuseumAlbum from '../../../assets/images/MuseumAlbum.png';
import story_dummy from '../../../assets/data/story_dummy';

function MuseumTheme() {
  const scrollbarStyle = `
    .custom-scroll-container {
        width: 1000px;
        height: 530px;
        overflow: auto;
    }
    
    .custom-scroll-content {
        display: flex;
        flex-wrap: nowrap;
        gap: 2.0rem;
    }
    .custom-scroll-container::-webkit-scrollbar {
        height: 10px;
    }
    
    .custom-scroll-container::-webkit-scrollbar-thumb {
        background-color:#E1C591;
        border-radius: 10px;
    }
    
    .custom-scroll-container::-webkit-scrollbar-track {
        background-color: #DFDFDF;
        border-radius: 10px;
    }
    
    .custom-scroll-container::-webkit-scrollbar-thumb:hover {
        background-color: #AD9373;
    }
  `;

  const customScrollRef = useRef<HTMLDivElement>(null); // Ref 생성

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (customScrollRef.current) {
      const container = customScrollRef.current;
      container.scrollLeft += event.deltaY;
    }
  };

  const styleElement = document.createElement('style');
  styleElement.textContent = scrollbarStyle;
  document.head.appendChild(styleElement);

  return (
    <div className="custom-scroll-container" ref={customScrollRef} onWheel={handleScroll}>
      <div className="custom-scroll-content">
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {story_dummy.map((story, index) => (
            <div
              key={index}
              style={{
                width: '270px',
                marginLeft: '30px',
                marginRight: '30px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img src={story.img} style={{ width: '100%', height: '270px', objectFit: 'cover' }} />
              <img
                src={MuseumAlbum}
                alt="Museum Album"
                style={{
                  width: '270px',
                  height: '270px',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
              <h3 className="font-Yeongdeok text-3xl mt-3 mb-2">{story.title}</h3>
              <p className="font-Yeongdeok text-xl">{story.content}</p>
            </div>
          ))}
          <img
            src={MuseumBg}
            alt="Museum Background"
            style={{
              width: '1200px',
              height: '650px',
              position: 'fixed',
              left: '19%',
              top: '14%',
              zIndex: -1,
              borderRadius: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MuseumTheme;
