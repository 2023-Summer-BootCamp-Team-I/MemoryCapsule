import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import KakaoShare from '../components/common/KakaoShare';
import StoryList from '../components/UnOpenedCapsule/StoryList';

export default function UnOpenedCapsulePage() {
  const { capsule_id } = useParams();

  useEffect(() => {
    sessionStorage.removeItem('capsule_id');
  }, []);

  return (
    <div>
      {/* capsule_id: {capsule_id} */}
      {/* <StoryModal title="Detail" content="detail" />
      <StoryModal title="Create" content="create" /> */}
      <div className="absolute bottom-[28rem]">
        {capsule_id && <KakaoShare capsule_id={capsule_id} state={'unopened'} />}
      </div>

      <StoryList />
    </div>
  );
}
