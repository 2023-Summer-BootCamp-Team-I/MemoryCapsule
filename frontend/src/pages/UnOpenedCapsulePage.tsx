import StoryModal from '../components/common/StoryModal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import KakaoShare from '../components/common/KakaoShare';

export default function UnOpenedCapsulePage() {
  const { capsule_id } = useParams();

  useEffect(() => {
    sessionStorage.removeItem('capsule_id');
  }, []);

  return (
    <div>
      {/* UnOpenedCapsulePage */}
      capsule_id: {capsule_id}
      <StoryModal title="Detail" content="detail" />
      <StoryModal title="Create" content="create" />
      {capsule_id && <KakaoShare capsule_id={capsule_id} state={'unopened'} />}
    </div>
  );
}
