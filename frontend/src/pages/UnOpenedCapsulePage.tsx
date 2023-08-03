import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import KakaoShare from '../components/common/KakaoShare';
import StoryList from '../components/UnOpenedCapsule/StoryList';

import { useRecoilValue } from 'recoil';
import { TokenState } from '../utils/Recoil';
import axios from 'axios';
import { AxiosErrorResponseType, MyCapsuleListType } from '../utils/types';
import PasswordModal from '../components/MainUnopenCapsule/PasswordModal';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UnOpenedCapsulePage() {
  const navigate = useNavigate();
  const { capsule_id } = useParams();
  const token = useRecoilValue(TokenState);
  const [capsuleData, setCapsuleData] = useState<MyCapsuleListType>();
  const [passwdOpen, setPasswdOpen] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = () => {
    setShowConfirmation(false);
    setPasswdOpen(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    navigate('/mainunopened');
  };

  const closePasswdModal = () => {
    setPasswdOpen(false);
    navigate('/mainunopened');
  };

  const ConfirmationModal = ({ message, onConfirm, onCancel }: ConfirmationModalProps) => {
    return (
      <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-70">
        <div className="p-8 bg-white rounded-lg">
          <p className="mb-4 text-xl">{message}</p>
          <div className="flex justify-center">
            <button className="px-4 py-2 mr-4 text-white bg-blue-500 rounded" onClick={onConfirm}>
              네
            </button>
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
              아니오
            </button>
          </div>
        </div>
      </div>
    );
  };

  const capsuleInfoAPI = async () => {
    try {
      await axios
        .get(`https://memorycapsule.co.kr/api/v1/capsules/${capsule_id}?jwt_token=${token}`)
        .then((response) => {
          setCapsuleData(response.data.capsule_data);
        });
    } catch (error) {
      const axiosError = error as AxiosErrorResponseType;
      if (axiosError.response?.data.message) {
        if (axiosError.response?.data.message === '캡슐에 포함되지 않은 유저입니다.') {
          setShowConfirmation(true);
        } else {
          alert(axiosError.response.data.message);
        }
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const checkIsMemberAPI = async () => {
    try {
      await axios
        .get(
          `https://memorycapsule.co.kr/api/v1/capsules/users?capsule_id=${capsule_id}&jwt_token=${token}`
        )
        .then(() => {});
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
    capsuleInfoAPI();
    checkIsMemberAPI();
  }, []);

  return (
    <div>
      {showConfirmation && (
        <ConfirmationModal
          message="이 캡슐에 들어가시겠습니까?"
          onConfirm={handleConfirmation}
          onCancel={handleCancelConfirmation}
        />
      )}
      {passwdOpen && <PasswordModal capsuleId={capsule_id} closeModal={() => closePasswdModal()} />}
      <div className="absolute bottom-[28rem]">
        {capsule_id && (
          <KakaoShare capsule_id={capsule_id} capsuleData={capsuleData} state={'unopened'} />
        )}
      </div>

      <StoryList capsule_id={capsule_id} capsuleData={capsuleData} />
    </div>
  );
}
