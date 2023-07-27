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

export type StoryListType = {
  creator: string;
  is_mine: boolean;
  story_id: number;
  story_title: string;
  story_url: string;
};

export type StoryListOneType = {
  code: number;
  message: string;
  creator_id: string;
  capsule_id: number;
  story_title: string;
  story_content: string;
  story_img_url: string;
  created_at: string;
  updated_at: string;
  story_id: number;
  is_mine: boolean;
  
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