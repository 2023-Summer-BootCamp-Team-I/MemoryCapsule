/* eslint-disable no-console */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import KakaoShare from '../components/common/KakaoShare';
import StoryList from '../components/UnOpenedCapsule/StoryList';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';
import axios from 'axios';
import { AxiosErrorResponseType } from '../utils/types';

export default function UnOpenedCapsulePage() {
  const navigate = useNavigate();
  const { capsule_id } = useParams();
  const token = useRecoilValue(TokenState);

  const checkIsMemberAPI = async () => {
    try {
      await axios
        .get(`/api/v1/capsules/users?capsule_id=${capsule_id}&jwt_token=${token}`)
        .then((response) => {
          console.log('response: ', response);
        });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message === '캡슐에 포함되지 않은 유저입니다') {
        alert('캡슐에 포함되지 않은 유저입니다');
        navigate('/mainunopened');
      } else {
        {
          axiosError.response && alert(axiosError.response.data.message);
        }
        navigate('/mainunopened');
      }
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('capsule_id');
    console.log('token: ', token);
    checkIsMemberAPI();
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
