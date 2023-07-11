import { useParams } from 'react-router-dom';
import KakaoShare from '../components/common/KakaoShare';

export default function OpenedCapsulePage() {
  const { capsule_id } = useParams();

  return (
    <div>
      capsule_id: {capsule_id} <br />
      OpenedCapsulePage
      {capsule_id && <KakaoShare capsule_id={capsule_id} state={'opened'} />}
    </div>
  );
}
