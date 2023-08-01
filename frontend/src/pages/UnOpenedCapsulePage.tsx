/* eslint-disable no-console */
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import KakaoShare from '../components/common/KakaoShare';
import StoryList from '../components/UnOpenedCapsule/StoryList';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';

export default function UnOpenedCapsulePage() {
  const { capsule_id } = useParams();
  const token = useRecoilValue(TokenState);

  useEffect(() => {
    sessionStorage.removeItem('capsule_id');
    console.log('token: ', token);
  }, []);

  return (
    <div>
      <div className="absolute bottom-[28rem]">
        {capsule_id && <KakaoShare capsule_id={capsule_id} state={'unopened'} />}
      </div>

      <StoryList capsule_id={capsule_id} />
    </div>
  );
}
