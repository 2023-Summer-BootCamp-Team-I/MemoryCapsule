import { useParams } from 'react-router-dom';

export default function OpenedCapsulePage() {
  const { capsule_id } = useParams();

  return (
    <div>
      capsule_id: {capsule_id} <br />
      OpenedCapsulePage
    </div>
  );
}
