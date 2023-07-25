import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistAtom1 } = recoilPersist({
  key: 'recoil-persist-1',
  storage: localStorage,
});

const { persistAtom: persistAtom2 } = recoilPersist({
  key: 'recoil-persist-2',
  storage: localStorage,
});

export const loggedInState = atom<boolean>({
  key: 'loggedInState',
  default: false,
  effects_UNSTABLE: [persistAtom1],
});

export const TokenState = atom<string>({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom2],
});

export const UesrDataState = atom({
  key: 'userDataState',
  default: { nickname: '', user_img_url: '' },
  effects_UNSTABLE: [persistAtom2],
});
