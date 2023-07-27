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
};
