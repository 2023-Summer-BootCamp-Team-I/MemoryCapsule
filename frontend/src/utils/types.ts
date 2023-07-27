export type UnopenCapsuleType = {
  id: string;
  img: string;
  name: string;
  num: string;
  day: string;
};

export type OpenCapsuleType = {
  id: string;
  img: string;
  name: string;
};

export type StoryType = {
  img: string;
  owner: string;
  title: string;
  content: string;
};

// API 연동 중 만든 타입들
export type MyCapsuleListType = {
  capsule_id: number;
  capsule_img_url: string;
  capsule_name: string;
  capsule_password: string;
  due_date: string;
  limit_count: number;
  nickname: string;
  theme_id: number;
  created_at: string;
  updated_at: string;
};

export type AxiosErrorResponseType = {
  response?: {
    data: {
      message: string;
    };
  };
};

export type JoinUserType = {
  img_file: string;
  id: string;
  password: string;
  email: string;
  phone_number: string;
};

export type CapsuleMateType = {
  length: number;
  user_id: string;
  nickname: string;
  user_img_url: string;
};
