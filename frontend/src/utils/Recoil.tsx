import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loggedInState = atom<boolean>({
  key: 'loggedInState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
