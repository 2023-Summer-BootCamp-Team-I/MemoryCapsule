import StoryModal from '../components/common/StoryModal';
import { useParams } from 'react-router-dom';

export default function UnOpenedCapsulePage() {
  const { capsule_id } = useParams();

  return (
    <div>
      {/* UnOpenedCapsulePage */}
      capsule_id: {capsule_id}
      <StoryModal title="Detail" content="detail" />
      <StoryModal title="Create" content="create" />
    </div>
  );
}
