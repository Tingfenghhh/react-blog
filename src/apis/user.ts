import { UseAxiosCustomConfig } from '@/typings/customConfig';

const baseURL = '/blog/user';
const options: UseAxiosCustomConfig['options'] = {
  manual: true,
};

// 获取用户信息
export const getUserInfoConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/getUserInfo`,
    method: 'GET',
  },
  options,
};

// 更新用户头像
export const updateAvatarConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/updateAvatar`,
    method: 'PATCH',
  },
  options,
};

// 更新用户信息

export const updateUserInfoConfig: UseAxiosCustomConfig = {
  config: {
    url: `${baseURL}/updateUser`,
    method: 'PUT',
  },
  options,
};
